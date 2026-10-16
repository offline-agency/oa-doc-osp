import { execFileSync } from 'node:child_process'
import { createHash } from 'node:crypto'
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'node:fs'
import { dirname, resolve, posix } from 'node:path'
import { createRequire } from 'node:module'
import { fileURLToPath } from 'node:url'

// Explicit local refresh only: git show reads the manifest pin, never HEAD or a branch.
// Check mode uses frozen input bytes and hashes; it needs neither Git nor network.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const config = JSON.parse(readFileSync(resolve(root, 'maintenance/package-sources.json'), 'utf8')).packages.find(p => p.docsPage === 'laravel-cart.md')
if (!config || !/^[a-f0-9]{40}$/.test(config.commit)) throw new Error('Cart source pin missing')
const { commit, repository, selectedTag: packageVersion } = config
const { documentationKey } = createRequire(import.meta.url)('./documentation-versions.cjs')
const strategy = config.documentation?.strategy || 'compatibility'
const key = documentationKey(packageVersion, strategy)
const args = process.argv.slice(2)
const check = args.includes('--check')
const at = args.indexOf('--reference')
const reference = at < 0 ? null : args[at + 1]
if (args.some((arg, i) => arg !== '--check' && arg !== '--reference' && !(at >= 0 && i === at + 1)) || (at >= 0 && !reference) || (check && reference)) throw new Error('Usage: node scripts/import-cart.mjs [--reference /read-only/clone | --check]')
const hash = value => createHash('sha256').update(value).digest('hex')
const evidencePath = 'maintenance/evidence/cart-import.json'
const fixture = 'maintenance/fixtures/cart/import-source'
const prior = existsSync(resolve(root, evidencePath)) ? JSON.parse(readFileSync(resolve(root, evidencePath), 'utf8')) : null
const get = path => readFileSync(resolve(root, path), 'utf8')
function put(path, body) {
  if (check) {
    if (!existsSync(resolve(root, path)) || get(path) !== body) throw new Error(`Outdated Cart import: ${path}`)
  } else {
    mkdirSync(dirname(resolve(root, path)), { recursive: true })
    writeFileSync(resolve(root, path), body)
  }
}
let paths
if (reference) {
  const git = (...args) => execFileSync('git', ['-C', reference, ...args], { encoding: 'utf8' }).trim()
  const resolvedTag = git('rev-parse', '--verify', `refs/tags/${packageVersion}^{commit}`)
  if (resolvedTag !== commit) throw new Error(`Cart selected tag does not match manifest commit: ${packageVersion}`)
  paths = git('ls-tree', '-r', '--name-only', commit).split('\n').filter(p => /^(docs\/v4\/|src\/|tests\/|config\/|database\/|examples\/|resources\/boost\/|scripts\/)/.test(p) || ['README.md', 'CHANGELOG.md', 'UPGRADE.md', 'CONTRIBUTING.md', 'LARASTAN.md', '.github/RELEASING.md', 'composer.json', 'composer.lock', 'LICENSE'].includes(p)).sort()
} else {
  if (!prior || prior.commit !== commit) throw new Error('Source commit changed; rerun with --reference')
  if (prior.documentation.packageVersion !== packageVersion || prior.repository !== repository) throw new Error('Source release metadata changed; rerun with --reference')
  paths = prior.inputs.map(i => i.path)
}
const sources = new Map()
// Batch immutable blob reads avoids a Git process per input, while preserving bytes.
const blobs = reference ? execFileSync('git', ['-C', reference, 'cat-file', '--batch'], { input: paths.map(path => `${commit}:${path}\n`).join(''), maxBuffer: 64 * 1024 * 1024 }) : null
let offset = 0
for (const path of paths) {
  let body
  if (blobs) {
    const end = blobs.indexOf(10, offset)
    const header = blobs.subarray(offset, end).toString('utf8')
    const match = /^[a-f0-9]{40} blob (\d+)$/.exec(header)
    if (!match) throw new Error(`Missing pinned Cart blob: ${path}`)
    const size = Number(match[1])
    body = blobs.subarray(end + 1, end + 1 + size).toString('utf8')
    offset = end + 2 + size
  } else body = get(`${fixture}/${path}`)
  if (!reference && prior.inputs.find(i => i.path === path)?.sha256 !== hash(body)) throw new Error(`Pinned Cart input hash mismatch: ${path}`)
  sources.set(path, body)
  put(`${fixture}/${path}`, body)
}
const guides = paths.filter(p => /^docs\/v4\/[^/]+\.md$/.test(p))
if (guides.length !== 14) throw new Error(`Expected 14 Cart v4 guides, found ${guides.length}`)
const guideRoute = path => `/laravel-cart/${posix.basename(path) === 'index.md' ? '' : posix.basename(path, '.md') + '/'}`
const sourceURL = path => `${repository}/blob/${commit}/${path}`
function links(body, sourcePath) {
  return body.replace(/(!?\[[^\]\n]*\]\()([^\s)]+)(\))/g, (all, before, target, after) => {
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|\/)/i.test(target)) return all
    const [path, fragment] = target.split('#')
    const resolved = path ? posix.normalize(posix.join(posix.dirname(sourcePath), path)) : sourcePath
    const anchor = fragment === undefined ? '' : `#${fragment}`
    if (guides.includes(resolved)) return `${before}${guideRoute(resolved)}${anchor}${after}`
    if (!sources.has(resolved)) throw new Error(`Unresolved Cart source link: ${sourcePath} -> ${target}`)
    return `${before}${sourceURL(resolved)}${anchor}${after}`
  })
}
const outputs = []
const pageDescriptions = {
 'index': 'Laravel 12/13 shopping cart for PHP 8.4/8.5: installation, VAT, coupons, persistent carts and released 4.1 guarantees.',
 'installation': 'Exact PHP, BCMath and Laravel requirements, Composer installation and separate config/live-cart/snapshot publishing commands.',
 'configuration': 'Laravel Cart configuration for drivers, owners, TTL, rounding, limits, events and guest transfer.',
 'usage': 'Executable Laravel Cart quick start with named arguments, repricing, row coupons and expected float totals.',
 'reference': 'Public Laravel Cart methods, signatures, return types, models, resources, events, commands and exceptions.',
 'money-and-tax': 'Net, gross, VAT, rounding and mixed tax rates; cart-coupon discounts are not allocated to payable VAT.',
 'coupons': 'Once-per-row item discounts and ordered cart coupons: eligibility, caps and redemption limits.',
 'storage': 'Persistent database and session carts: owner isolation, TTL, atomic mutation, PostgreSQL/MySQL concurrency and snapshots.',
 'authentication': 'Since 4.1: opt-in guest-to-user live database cart transfer, login regeneration and legacy snapshot middleware.',
 'testing': 'CartFake, executable examples, regression tests and contributing checks for Laravel Cart.',
 'upgrading': 'Upgrade to released Laravel Cart 4.1 from earlier v4 or v3: requirements, migrations and changed guarantees.',
 'troubleshooting': 'Diagnose invalid prices, cart limits, contention, failed transfer, missing rows and VAT discrepancies.',
 'alternatives': 'Dated primary-source alternatives and boundaries for choosing a Laravel shopping cart.',
 'agents': 'Optional Laravel Boost integration and neutral manual evaluation guidance; no runtime AI dependency.'
}
const releaseNote = '> **Release ' + packageVersion + '.** This guide describes the selected `' + packageVersion + '` release, pinned below. **Since 4.1.0:** built-in atomic live mutations, repricing that preserves and reapplies item coupons, and opt-in live guest-cart transfer. These guarantees must not be assumed for the earlier 4.0.3 release. See [storage](/laravel-cart/storage/), [money and tax](/laravel-cart/money-and-tax/) and [authentication](/laravel-cart/authentication/). Public amounts remain floats; cart coupons do not allocate post-discount VAT per tax rate.\n\n'
function page(path, title, body, sourcePath, description = pageDescriptions[posix.basename(sourcePath, '.md')] || `Laravel Cart ${packageVersion}: ${title}.`) {
  const permalink = path === 'laravel-cart.md' ? '/laravel-cart/' : `/laravel-cart/${posix.basename(path, '.md')}/`
  const value = `---\ntitle: ${JSON.stringify(title)}\ndescription: ${JSON.stringify(description)}\npackageVersion: ${JSON.stringify(packageVersion)}\nsourceCommit: ${commit}\npermalink: ${permalink}\n---\n\n${body.trim()}\n\n---\n\nImported from [${sourcePath}](${sourceURL(sourcePath)}) at \`${commit}\` (release \`${packageVersion}\`). Upstream [MIT license](${sourceURL('LICENSE')}) retained in the frozen import.\n`
  put(path, value)
  outputs.push({ path, sourcePath, sha256: hash(value) })
}
for (const path of guides) {
  let body = links(sources.get(path), path)
  body = body.replace(/composer require offline-agency\/laravel-cart(?![:\w-])/g, 'composer require offline-agency/laravel-cart:' + packageVersion)
  const title = body.match(/^# (.+)/)?.[1]
  if (!title) throw new Error(`Missing Cart guide title: ${path}`)
  if (path === 'docs/v4/index.md') {
    const old = 'These sources describe the proposed next v4 release. Public website deployment is pending.'
    if (!body.includes(old)) throw new Error('Cart release-label correction needs review')
    body += '\n\n- [Historical site documentation](/laravel-cart/legacy/)\n- [Archived 4.0.3 release documentation](/laravel-cart/4.0.3/)\n- [Site URL migration map](/laravel-cart/url-migration/)\n'
    body = body.replace(old, `These pages document released Laravel Cart \`${packageVersion}\` from the pinned tag. The public documentation website is maintained separately from the package release.`)
  }
  if (path === 'docs/v4/configuration.md') body += '\n\n## Released configuration defaults\n\nThis block is imported from the same release as this guide. Publish the config before changing application settings; configure owner schema before running its migrations. The [full API reference](/laravel-cart/reference/#configuration-reference) describes the related operations.\n\n```php\n' + sources.get('config/cart.php').trim() + '\n```\n'
  if (path === 'docs/v4/reference.md') {
    const old = 'Rows whose id is not in the list are removed, existing ids get the new quantity, and new ids are added.'
    if (!body.includes(old)) throw new Error('Review upstream sync identity correction')
    // The retained upstream README starts with its own H1; keep one page H1 by
    // demoting every later heading outside fenced code. Heading IDs are unchanged.
    let fenced = false, first = true
    body = body.split('\n').map(line => {
      if (/^(```|~~~)/.test(line)) fenced = !fenced
      if (fenced || !/^#{1,5} /.test(line)) return line
      if (first && line.startsWith('# ')) { first = false; return line }
      return '#' + line
    }).join('\n')
    body = body.replace(old, 'Sync identifies rows by product ID **and options**, not product ID alone. Matching rows receive the new quantity and keep existing prices; absent variants are removed and new variants are added. Supplying an ID without its previous options replaces that variant. Duplicate target identities are rejected. See [variants and wishlist](/laravel-cart/variants-and-wishlist/) and the [released mutation tests](' + sourceURL('tests/Regression/MutationCorrectnessTest.php') + ').')
  }
  if (path === 'docs/v4/index.md') {
    const excerpt = sources.get('examples/quick-start.php').split('// docs:start')[1]?.split('// docs:end')[0]?.trim().split('\n').map(line => line.replace(/^        /, '')).join('\n')
    if (!excerpt) throw new Error('Quick-start source markers missing')
    body += '\n\n## Install and try it\n\nRequires PHP `~8.4.0 || ~8.5.0`, BCMath and Illuminate `^12.69.2 || ^13.32`.\n\n```sh\ncomposer require offline-agency/laravel-cart:' + packageVersion + '\n```\n\nIn a configured Laravel application, use an isolated demo instance with synthetic trusted catalog values. The snippet below is extracted from the released executable example; its two-driver test verifies the expected total.\n\n```php\nuse OfflineAgency\\LaravelCart\\CartCoupon;\n\n$cart = app(\'cart\')->instance(\'documentation-example\');\n$cart->destroy(); // Reset only this isolated demo instance.\n' + excerpt + '\n```\n\n[Executable example](' + sourceURL('examples/quick-start.php') + ') · [Session and database assertions](' + sourceURL('tests/Feature/DocumentationExamplesTest.php') + ')\n\n## Choose a practical guide\n\n- [Choosing Laravel Cart: fit, limitations and alternatives](/laravel-cart/choosing/)\n- [Product variants, wishlist and Buyable models](/laravel-cart/variants-and-wishlist/)\n- [Livewire and Inertia/Vue application scaffolding](/laravel-cart/integrations/)\n- [Authenticated API and mobile carts](/laravel-cart/api-and-mobile/)\n- [Redis-backed Laravel sessions versus a cart driver](/laravel-cart/redis-sessions/)\n'
  }
  const availabilityPages = ['index','usage','reference','money-and-tax','storage','authentication','upgrading']
  if (availabilityPages.includes(posix.basename(path, '.md'))) body = body.replace(/^(# .+\n\n)/, `$1${releaseNote}`)
  page(path === 'docs/v4/index.md' ? 'laravel-cart.md' : `laravel-cart/${posix.basename(path)}`, title, body, path)
}
const adapterDirectory = 'maintenance/cart-adapters'
const adapters = existsSync(resolve(root, adapterDirectory)) ? readdirSync(resolve(root, adapterDirectory)).filter(p => /^[a-z0-9-]+\.md$/.test(p)).sort().map(p => `${adapterDirectory}/${p}`) : []
for (const path of adapters) {
  const body = get(path)
  const name = posix.basename(path)
  if (guides.some(p => posix.basename(p) === name) || ['legacy.md', 'url-migration.md'].includes(name)) throw new Error(`Cart adapter collides with owned page: ${name}`)
  // Adapters are reviewed site source, not upstream. Preserve their full front matter.
  if (!body.includes(`sourceCommit: ${commit}`)) throw new Error(`Cart adapter sourceCommit mismatch: ${path}`)
  if (!new RegExp(`^packageVersion: ["']?${packageVersion.replaceAll('.', '\\.')}["']?$`, 'm').test(body)) throw new Error(`Cart adapter packageVersion mismatch: ${path}`)
  put(`laravel-cart/${name}`, body)
  outputs.push({ path: `laravel-cart/${name}`, adapterPath: path, sha256: hash(body) })
}
if (!reference && JSON.stringify(prior.adapters) !== JSON.stringify(adapters.map(path => ({ path, sha256: hash(get(path)) })))) throw new Error('Cart adapter input hash mismatch; review and refresh with --reference')
const evidence = {
  schemaVersion: 1, verifiedOn: config.verifiedOn, repository, commit,
  documentation: { key, packageVersion, strategy },
  inputs: paths.map(path => ({ path, sha256: hash(sources.get(path)) })),
  adapters: adapters.map(path => ({ path, sha256: hash(get(path)) })), outputs,
  assets: [], upstreamRuntimeMounted: false,
  transformations: ['Preserve all 14 docs/v4 Markdown guides and executable snippets.', 'Add English site metadata, exact release provenance and compatibility boundary.', 'Resolve guide links and fragments to site routes; source-only links to immutable GitHub blobs.', 'Correct stale proposed-release label in tagged index; retain dated alternatives and monetary limitations.', 'Copy reviewed maintenance/cart-adapters Markdown with pinned metadata.', 'Correct source reference sync identity from product-only to ID plus options using released runtime/tests.', 'Extract the marked executable quick-start snippet into the landing and link all site recipes.', 'Pin Composer commands to the documented release and embed actual released configuration defaults.'],
}
put(evidencePath, JSON.stringify(evidence, null, 2) + '\n')
console.log(`${check ? 'Verified' : 'Imported'} ${guides.length} Cart guides and ${adapters.length} site adapters at ${commit}; ${paths.length} pinned inputs.`)
