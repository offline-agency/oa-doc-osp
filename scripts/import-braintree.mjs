import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, mkdirSync, existsSync, unlinkSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

// Local, pinned-source import. Never resolves branches, installs packages or uses network.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourceConfig = JSON.parse(readFileSync(resolve(root, 'maintenance/package-sources.json'), 'utf8')).packages.find(p => p.docsPage === 'braintree-vue3.md')
if (!sourceConfig || !/^[a-f0-9]{40}$/.test(sourceConfig.commit)) throw new Error('Braintree source pin missing')
const { commit, repository } = sourceConfig
const { documentationKey } = createRequire(import.meta.url)('./documentation-versions.cjs')
const strategy = sourceConfig.documentation?.strategy || 'exact'
const packageVersion = strategy === 'development' ? null : sourceConfig.selectedTag
const key = documentationKey(packageVersion, strategy)
const route = `/braintree-vue3/${key}/`
const fixture = 'maintenance/fixtures/braintree-vue3/import-source'
const args = process.argv.slice(2)
const check = args.includes('--check')
const at = args.indexOf('--reference')
const reference = at < 0 ? null : args[at + 1]
if (args.some((arg, index) => arg !== '--check' && arg !== '--reference' && !(at >= 0 && index === at + 1)) || (at >= 0 && !reference)) throw new Error('Usage: node scripts/import-braintree.mjs [--reference /read-only/clone] [--check]')
const hash = value => createHash('sha256').update(value).digest('hex')
const sourceURL = path => `${repository}/blob/${commit}/${path}`
function put(path, body) {
  const full = resolve(root, path)
  if (check) {
    if (!existsSync(full) || readFileSync(full, 'utf8') !== body) throw new Error(`Outdated Braintree import: ${path}`)
  } else {
    mkdirSync(dirname(full), { recursive: true })
    writeFileSync(full, body)
  }
}
let paths
if (reference) {
  const all = execFileSync('git', ['-C', reference, 'ls-tree', '-r', '--name-only', commit], { encoding: 'utf8' }).trim().split('\n')
  paths = all.filter(p => /^(docs\/|src\/|tests\/)/.test(p) || ['package.json', 'typedoc.json', 'tsconfig.app.json', 'README.md', 'CHANGELOG.md'].includes(p) || /^licen[cs]e/i.test(p)).sort()
} else {
  paths = JSON.parse(readFileSync(resolve(root, 'maintenance/evidence/braintree-import.json'), 'utf8')).inputs.map(i => i.path)
}
const priorEvidence = existsSync(resolve(root, 'maintenance/evidence/braintree-import.json')) ? JSON.parse(readFileSync(resolve(root, 'maintenance/evidence/braintree-import.json'), 'utf8')) : null
if (!reference && priorEvidence?.commit !== commit) throw new Error('Source commit changed; rerun with --reference')
const sources = new Map()
for (const path of paths) {
  const body = reference ? execFileSync('git', ['-C', reference, 'show', `${commit}:${path}`], { encoding: 'utf8' }) : readFileSync(resolve(root, fixture, path), 'utf8')
  if (!reference && priorEvidence.inputs.find(i => i.path === path)?.sha256 !== hash(body)) throw new Error(`Pinned Braintree input hash mismatch: ${path}`)
  sources.set(path, body)
  put(`${fixture}/${path}`, body)
}
const guides = paths.filter(p => /^docs\/guide\/[^/]+\.md$/.test(p))
let integration = readFileSync(resolve(root, 'braintree-vue3/integration.md'), 'utf8')
if (!integration.includes(`sourceCommit: ${commit}`)) throw new Error('Integration adapter sourceCommit mismatch: review its prose and verification claims for the new pin, then update sourceCommit explicitly')
integration = integration.replace(/^packageVersion:.*\n/gm, '')
if (packageVersion) integration = integration.replace(/^sourceCommit: (.+)$/m, `$&\npackageVersion: ${JSON.stringify(packageVersion)}`)
put('braintree-vue3/integration.md', integration)
const outputs = []
function page(path, title, body, sourcePath = 'src/index.ts') {
  const slug = path === 'braintree-vue3.md' ? '' : path.slice('braintree-vue3/'.length, -3) + '/'
  const value = `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(`Pinned source-only Braintree Vue 3 documentation: ${title}.`)}\nsourceCommit: ${commit}\n${packageVersion ? `packageVersion: ${JSON.stringify(packageVersion)}\n` : ''}permalink: /braintree-vue3/${slug}\n---\n\n${body.trim()}\n\n---\n\nAdapted from [offline-agency/braintree-vue3, ${sourcePath}](${sourceURL(sourcePath)}) at \`${commit}\`. The manifest declares MIT; this snapshot contains no standalone LICENSE file. Site adaptations are recorded in [the import findings](${sourceURL('typedoc.json')}).\n`
  // Findings live in maintenance, so expose the usable scope page instead of a dead site link.
  let corrected = value.replace(`[the import findings](${sourceURL('typedoc.json')})`, '[integration notes](/braintree-vue3/next/integration/)')
  corrected = corrected.replaceAll('/braintree-vue3/next/', route)
  if (packageVersion) {
    corrected = corrected.replace('Pinned source-only Braintree Vue 3 documentation:', 'Pinned Braintree Vue 3 release documentation:')
    corrected = corrected.replace('> **Unreleased source snapshot.** Public npm returned 404 and GitHub had no tags or releases on 16 October 2026. Package-manager commands below describe the intended distribution; use the', `> **Release snapshot ${packageVersion}.** Follow the selected release distribution metadata; the`)
    corrected = corrected.replace(/This is documentation for \*\*unreleased source\*\*, pinned to[^\n]+/, `This is documentation for selected release \`${packageVersion}\`, pinned to \`${commit}\`. Consult the selected release metadata for distribution and support status.`)
    corrected = corrected.replace('No public stable version is currently established. This documentation is published under the development `next` route.', `This documentation is published under compatibility route \`${key}\`, with exact release provenance \`${packageVersion}\`.`)
  }
  put(path, corrected)
  outputs.push({ path, sourcePath, sha256: hash(corrected) })
}
const corrections = {
  'hosted-fields': [
    ['No raw card data ever touches your JavaScript — the Braintree SDK tokenizes it server-side and returns a payment method nonce.', 'The SDK manages the card-entry iframes and returns a payment method nonce. The wrapper forwards SDK operations; this guide does not establish a compliance guarantee.'],
  ],
  'paypal': [
    ['| **Nonce reusable** | Yes (vaulted) | No (single use) |', '| **Returned nonce** | Send to your server for vaulting | Send to your server for checkout |'],
    ["const nonce = await createPayment({ flow: 'vault' })", "const paymentId = await createPayment({ flow: 'vault' })"],
    ['// payload.nonce is a vaulted payment method nonce', '// Send payload.nonce to your server; createPayment does not return a nonce.'],
  ],
  'venmo': [
    ['Enable the desktop PayPal login flow for users without the Venmo app:', 'Pass desktop Venmo login options through to the SDK:'],
    ['Use PayPal web login on desktop', 'Request Venmo web login on desktop'],
    ['| Option | Default | Description |', '| Option | SDK default (wrapper does not set it) | Description |'],
    ['// Complete the payment immediately', '// Send the nonce to your own authenticated server flow'],
  ],
  'three-d-secure': [
    ['It shifts fraud liability to the card issuer when `liabilityShifted` is `true`.', 'The SDK returns authentication and liability indicators; your server and payment-provider policy determine whether to proceed.'],
    ['The issuer authenticated the cardholder. Fraud liability shifts to the issuer.', 'The SDK reports liabilityShifted=true; evaluate this server-side under your provider policy.'],
    ['Authentication was attempted but not completed (e.g. card not enrolled). Liability stays with the merchant.', 'The SDK reports liabilityShifted=false; the boolean alone does not identify the reason.'],
    ['cancelVerifyCard() // dismisses the modal; verifyCard() resolves with partial data', 'cancelVerifyCard() // wrapper returns null and discards the SDK callback result'],
  ],
  'data-collector': [
    ["Passing `deviceData` to your server-side transaction call enables Braintree's fraud detection tools (Kount).", 'The wrapper forwards SDK device data; provider configuration and your server integration determine which fraud tools consume it.'],
    ['It is **not** sensitive PII — it is opaque to the frontend. You pass it verbatim to your server.', 'Treat device data as an opaque provider value and handle it according to your application privacy and retention requirements. The wrapper makes no PII classification.'],
    ["When you include `deviceData` in a server-side `transaction.sale()` call, Braintree's Advanced Fraud Tools (Kount) can analyze the device fingerprint alongside the payment data to detect high-risk transactions before they're submitted to the card network.", 'Your server can pass deviceData to the configured Braintree fraud tooling. The composable does not enable merchant fraud settings or perform server-side analysis.'],
    ['Without `deviceData`, Braintree fraud protection still applies, but device-level signals are not included.', 'The library does not establish which fraud protections apply to a transaction.'],
    ['Always include `deviceData` in every server-side `transaction.sale()` or `paymentMethod.create()` call.', 'Use deviceData in server requests where your Braintree integration requires it.'],
  ],
}
for (const path of guides) {
  const slug = path.split('/').at(-1).slice(0, -3)
  let body = sources.get(path)
  const title = body.match(/^# (.+)/)[1]
  for (const [from, to] of corrections[slug] || []) {
    if (!body.includes(from)) throw new Error(`Expected correction target absent in ${path}: ${from}`)
    body = body.replace(from, to)
  }
  body = body.replace(/\]\(\.\/([a-z-]+)\)/g, '](/braintree-vue3/next/$1/)')
  const note = '> **Unreleased source snapshot.** Public npm returned 404 and GitHub had no tags or releases on 16 October 2026. Package-manager commands below describe the intended distribution; use the [pinned source-build instructions](/braintree-vue3/next/integration/) for evaluation. Examples are application snippets, never mounted in this VuePress site. Some omit readiness/error handling, declarations or server functions; `useTemplateRef` examples require Vue 3.5+. See the integration notes for lifecycle, SSR and typing limits.\n\n'
  body = body.replace(/^(# .+\n\n)/, `$1${note}`)
  if (slug === 'paypal') body = body.replace('## Basic usage', '> The example defines `renderButton` but does not invoke it. Your application must wait for `isReady`, call it once, provide PayPal window types and handle operation failures.\n\n## Basic usage')
  if (slug === 'venmo') body += '\n\nThe returning-user example checks once on mount and can run before SDK readiness. Wait for `isReady` in the application before checking `hasTokenizationResult`. The wrapper only passes explicitly supplied options and `extraOptions`; table defaults are not wrapper guarantees.\n'
  if (slug === 'three-d-secure') body += '\n\nThe wrapper returns `null` from `cancelVerifyCard()` and ignores the SDK callback. It does not guarantee that an outstanding `verifyCard()` promise resolves or returns partial data. Handle both readiness refs and operation failures in the application.\n'
  page(`braintree-vue3/${slug}.md`, title, body, path)
}
const entry = sources.get('src/index.ts')
const rows = [...entry.matchAll(/export\s+(type\s+)?\{([^}]+)\}\s+from\s+'([^']+)'/g)].flatMap(([, type, names, target]) => {
  const p = `src/${target.slice(2)}${target.endsWith('.vue') ? '' : '.ts'}`
  if (!sources.has(p)) throw new Error(`Missing public source ${p}`)
  return names.split(',').map(n => n.trim()).filter(Boolean).map(n => `| \`${n.replace(/^default as /, '')}\` | ${type ? 'Type' : 'Runtime export'} | [\`${p}\`](${sourceURL(p)}) |`)
})
page('braintree-vue3/api.md', 'Public API source index', `# Public API source index\n\nThis table is extracted deterministically from the pinned \`src/index.ts\`. It is an export inventory with immutable source links, **not generated TypeDoc reference documentation**. Follow each source link for exact options, return types and implementation. The [integration notes](/braintree-vue3/next/integration/) summarize signatures and limitations.\n\n| Export | Kind | Declaration source |\n| --- | --- | --- |\n${rows.join('\n')}\n\nThe side-effect import \`./types\` applies SDK declaration augmentations before composable types are resolved.\n\nUpstream configures TypeDoc with \`typedoc-plugin-markdown\` and \`typedoc-vitepress-theme\`, targeting \`docs/api\`. No generated API Markdown or dependency lockfile is tracked at this commit. An isolated exact-version TypeDoc attempt failed with TS2307 for the two \`.vue\` component exports; no source shims were added. Source checking with vue-tsc passed. The committed toolchain lock records this attempt. This import does not claim complete generated API coverage.`, 'src/index.ts')
page('braintree-vue3.md', 'Braintree Vue 3', `# Braintree Vue 3\n\nVue 3 composables and renderless components for the Braintree Web SDK. This is documentation for **unreleased source**, pinned to \`${commit}\`; the manifest's \`0.1.0\` is not a verified release. GitHub tags/releases were empty and npm returned 404 on 16 October 2026. Support status is not documented.\n\nThe existing upstream guide is imported into the shared VuePress site. Its VitePress home/theme are represented as Markdown navigation; Vue 3 runtime components are shown only in fenced examples.\n\n${guides.map(p => { const slug = p.split('/').at(-1).slice(0,-3); return `- [${sources.get(p).match(/^# (.+)/)[1]}](/braintree-vue3/next/${slug}/)` }).join('\n')}\n- [Public API source index](/braintree-vue3/next/api/)\n- [Integration notes and checked examples](/braintree-vue3/next/integration/)\n\n[Upstream TypeDoc configuration](${sourceURL('typedoc.json')}) · [Upstream VitePress configuration](${sourceURL('docs/.vitepress/config.ts')})\n\nNo public stable version is currently established. This documentation is published under the development \`next\` route.`, 'docs/index.md')
// Delete only former generated outputs owned by this importer; preserve manual adapters and frozen versioned pages.
for (const previous of priorEvidence?.outputs || []) {
  if (outputs.some(output => output.path === previous.path)) continue
  if (!/^braintree-vue3\/[a-z0-9-]+\.md$/.test(previous.path) || previous.path === 'braintree-vue3/integration.md') throw new Error(`Unsafe obsolete import path: ${previous.path}`)
  if (existsSync(resolve(root, previous.path))) {
    if (check) throw new Error(`Obsolete Braintree import: ${previous.path}`)
    unlinkSync(resolve(root, previous.path))
  }
}
const evidence = {
  schemaVersion: 1, verifiedOn: '2026-10-16', repository, commit,
  documentation: { key, packageVersion, strategy },
  distribution: strategy !== 'development' ? { status: sourceConfig.status, selectedTag: packageVersion, metadata: sourceConfig.distribution || null } : { status: 'source-only', manifestVersion: '0.1.0', githubTags: [], githubReleases: [], npmStatus: 404, refresh: ['gh api --paginate repos/offline-agency/braintree-vue3/tags', 'gh api --paginate repos/offline-agency/braintree-vue3/releases', 'npm view braintree-vue3 --json --fetch-retries=0 --fetch-timeout=15000', 'git fetch origin'] },
  inputs: paths.map(path => ({ path, sha256: hash(sources.get(path)) })), outputs,
  adapters: [{ path: 'braintree-vue3/integration.md', sha256: hash(integration) }],
  api: { strategy: 'source-export-index', typedocExecuted: true, result: 'failed', reason: 'TypeDoc 0.28.14 + markdown 4.9.0 exits 3: TS2307 for both .vue component exports. No source shims or code modifications applied.', sourceTypecheck: 'vue-tsc 3.1.1 passes with TypeScript 5.9.3; selected integration SFC also passes', toolchain: 'maintenance/fixtures/braintree-vue3/import-toolchain/package-lock.json' },
  assets: [], upstreamRuntimeMounted: false,
}
put('maintenance/evidence/braintree-import.json', JSON.stringify(evidence, null, 2) + '\n')
console.log(`${check ? 'Verified' : 'Imported'} ${guides.length} Braintree guides and public export index at ${commit}; ${paths.length} pinned inputs.`)
