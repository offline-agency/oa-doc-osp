import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, cpSync, readFileSync, writeFileSync, mkdirSync, rmSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
const root = resolve(import.meta.dirname, '..')
function fixture(fn) {
  const dir = mkdtempSync(resolve(tmpdir(), 'braintree-import-test-'))
  try {
    mkdirSync(resolve(dir, 'scripts'))
    for (const p of ['scripts/import-braintree.mjs', 'scripts/documentation-versions.cjs', 'maintenance/evidence/braintree-import.json', 'maintenance/fixtures/braintree-vue3/import-source', 'maintenance/package-sources.json', 'braintree-vue3.md', 'braintree-vue3']) cpSync(resolve(root, p), resolve(dir, p), { recursive: true })
    symlinkSync(resolve(root, 'node_modules'), resolve(dir, 'node_modules'), 'dir')
    fn(dir)
  } finally { rmSync(dir, { recursive: true, force: true }) }
}
const run = dir => spawnSync(process.execPath, [resolve(dir, 'scripts/import-braintree.mjs'), '--check'], { encoding: 'utf8' })
test('frozen Braintree imports verify without source clone or network', () => fixture(dir => assert.equal(run(dir).status, 0)))
test('changed generated guide is detected', () => fixture(dir => {
  writeFileSync(resolve(dir, 'braintree-vue3/paypal.md'), 'changed')
  assert.match(run(dir).stderr, /Outdated Braintree import/)
}))
test('changed pinned upstream fixture is detected before adapting it', () => fixture(dir => {
  writeFileSync(resolve(dir, 'maintenance/fixtures/braintree-vue3/import-source/docs/guide/paypal.md'), 'changed')
  assert.match(run(dir).stderr, /input hash mismatch/)
}))
test('source pin mismatch requires explicit reference refresh', () => fixture(dir => {
  const path = resolve(dir, 'maintenance/package-sources.json')
  const value = JSON.parse(readFileSync(path, 'utf8'))
  value.packages.find(p => p.docsPage === 'braintree-vue3.md').commit = 'a'.repeat(40)
  writeFileSync(path, JSON.stringify(value))
  assert.match(run(dir).stderr, /Source commit changed/)
}))
test('guide navigation and code are scoped and source links immutable', () => {
  const guide = readFileSync(resolve(root, 'braintree-vue3/getting-started.md'), 'utf8')
  assert.match(guide, /\]\(\/braintree-vue3\/next\/hosted-fields\/\)/)
  assert.doesNotMatch(guide, /\]\(\.\/hosted-fields\)/)
  assert.match(guide, /```vue\n<script setup/)
  const api = readFileSync(resolve(root, 'braintree-vue3/api.md'), 'utf8')
  assert.match(api, /not generated TypeDoc/)
  assert.doesNotMatch(api, /github\.com\/offline-agency\/braintree-vue3\/(?:blob|tree)\/(?:main|master)\//)
})

test('promotion adds stable provenance and routes without modifying frozen next pages', () => fixture(dir => {
  const manifest = resolve(dir, 'maintenance/package-sources.json')
  const data = JSON.parse(readFileSync(manifest, 'utf8'))
  const source = data.packages.find(p => p.docsPage === 'braintree-vue3.md')
  source.documentation.strategy = 'compatibility'
  source.selectedTag = '0.1.2'
  writeFileSync(manifest, JSON.stringify(data))
  mkdirSync(resolve(dir, 'versioned/braintree-vue3/next'), { recursive: true })
  const frozen = resolve(dir, 'versioned/braintree-vue3/next/index.md')
  const nextBody = readFileSync(resolve(dir, 'braintree-vue3.md'), 'utf8')
  writeFileSync(frozen, nextBody)
  const result = spawnSync(process.execPath, [resolve(dir, 'scripts/import-braintree.mjs')], { encoding: 'utf8' })
  assert.equal(result.status, 0, result.stderr)
  for (const name of ['braintree-vue3.md', 'braintree-vue3/getting-started.md', 'braintree-vue3/integration.md']) {
    const text = readFileSync(resolve(dir, name), 'utf8')
    assert.match(text, /packageVersion: "0.1.2"/)
  }
  const landing = readFileSync(resolve(dir, 'braintree-vue3.md'), 'utf8')
  assert.match(landing, /\]\(\/braintree-vue3\/v0\.1\/hosted-fields\/\)/)
  assert.doesNotMatch(landing, /Unreleased source snapshot|documentation for \*\*unreleased source/)
  assert.equal(readFileSync(frozen, 'utf8'), nextBody)
  assert.equal(run(dir).status, 0)
}))
test('obsolete owned guide is removed while manual integration and frozen pages remain', () => fixture(dir => {
  const evidencePath = resolve(dir, 'maintenance/evidence/braintree-import.json')
  const evidence = JSON.parse(readFileSync(evidencePath, 'utf8'))
  evidence.outputs.push({ path: 'braintree-vue3/removed-guide.md', sha256: 'old' })
  writeFileSync(evidencePath, JSON.stringify(evidence))
  writeFileSync(resolve(dir, 'braintree-vue3/removed-guide.md'), 'old import')
  assert.match(run(dir).stderr, /Obsolete Braintree import/)
  const integration = readFileSync(resolve(dir, 'braintree-vue3/integration.md'), 'utf8')
  const result = spawnSync(process.execPath, [resolve(dir, 'scripts/import-braintree.mjs')], { encoding: 'utf8' })
  assert.equal(result.status, 0, result.stderr)
  assert.throws(() => readFileSync(resolve(dir, 'braintree-vue3/removed-guide.md')))
  assert.equal(readFileSync(resolve(dir, 'braintree-vue3/integration.md'), 'utf8'), integration)
  assert.equal(run(dir).status, 0)
}))
