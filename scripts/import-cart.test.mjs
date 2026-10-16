import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, cpSync, readFileSync, writeFileSync, mkdirSync, rmSync, existsSync, symlinkSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
const root = resolve(import.meta.dirname, '..')
function fixture(fn) {
  const dir = mkdtempSync(resolve(tmpdir(), 'cart-import-test-'))
  try {
    for (const p of ['scripts/import-cart.mjs', 'scripts/documentation-versions.cjs', 'maintenance/evidence/cart-import.json', 'maintenance/fixtures/cart/import-source', 'maintenance/cart-adapters', 'maintenance/package-sources.json', 'laravel-cart.md', 'laravel-cart']) {
      mkdirSync(resolve(dir, p, '..'), { recursive: true })
      if (existsSync(resolve(root, p))) cpSync(resolve(root, p), resolve(dir, p), { recursive: true })
    }
    symlinkSync(resolve(root, 'node_modules'), resolve(dir, 'node_modules'), 'dir')
    fn(dir)
  } finally { rmSync(dir, { recursive: true, force: true }) }
}
const run = (dir, ...args) => spawnSync(process.execPath, [resolve(dir, 'scripts/import-cart.mjs'), ...args], { encoding: 'utf8' })
test('frozen Cart import verifies without clone or network', () => fixture(dir => {
  const result = run(dir, '--check')
  assert.equal(result.status, 0, result.stderr)
}))
test('detects generated page drift', () => fixture(dir => {
  writeFileSync(resolve(dir, 'laravel-cart/usage.md'), 'changed')
  assert.match(run(dir, '--check').stderr, /Outdated Cart import/)
}))
test('detects raw pinned input drift before adapting it', () => fixture(dir => {
  writeFileSync(resolve(dir, 'maintenance/fixtures/cart/import-source/docs/v4/usage.md'), 'changed')
  assert.match(run(dir, '--check').stderr, /input hash mismatch/)
}))
test('changed source pin requires explicit source refresh', () => fixture(dir => {
  const path = resolve(dir, 'maintenance/package-sources.json')
  const data = JSON.parse(readFileSync(path, 'utf8'))
  data.packages.find(p => p.docsPage === 'laravel-cart.md').commit = 'a'.repeat(40)
  writeFileSync(path, JSON.stringify(data))
  assert.match(run(dir, '--check').stderr, /Source commit changed/)
}))
test('all 14 upstream guides retain English metadata and immutable source links', () => {
  const evidence = JSON.parse(readFileSync(resolve(root, 'maintenance/evidence/cart-import.json'), 'utf8'))
  const guides = evidence.outputs.filter(p => p.sourcePath?.startsWith('docs/v4/'))
  assert.equal(guides.length, 14)
  for (const item of guides) {
    const body = readFileSync(resolve(root, item.path), 'utf8')
    assert.match(body, /^---\ntitle: /)
    assert.match(body, /packageVersion: "4\.1\.0"/)
    assert.match(body, /sourceCommit: b89d3219202703203453890e2e46467e79ad415d/)
    assert.doesNotMatch(body, /\]\((?:\.\.?\/|[a-z-]+\.md|#)/)
    assert.doesNotMatch(body, /proposed next v4 release|Public website deployment is pending/)
  }
  const usage = readFileSync(resolve(root, 'laravel-cart/usage.md'), 'utf8')
  assert.match(usage, /blob\/b89d3219202703203453890e2e46467e79ad415d\/examples\/quick-start.php/)
  assert.match(readFileSync(resolve(root, 'laravel-cart.md'), 'utf8'), /Since 4\.1\.0/)
})
test('changed release tag is rejected without refreshing source', () => fixture(dir => {
  const path = resolve(dir, 'maintenance/package-sources.json')
  const data = JSON.parse(readFileSync(path, 'utf8'))
  data.packages.find(p => p.docsPage === 'laravel-cart.md').selectedTag = '4.1.1'
  writeFileSync(path, JSON.stringify(data))
  assert.match(run(dir, '--check').stderr, /Source release metadata changed/)
}))
test('explicit reference refuses tag and manifest commit disagreement', () => fixture(dir => {
  const repo = resolve(dir, 'wrong-reference')
  mkdirSync(repo)
  for (const args of [['init', '-q'], ['-c', 'user.name=Importer Test', '-c', 'user.email=importer@example.invalid', 'commit', '--allow-empty', '-qm', 'fixture'], ['tag', '4.1.0']]) {
    const result = spawnSync('git', ['-C', repo, ...args], { encoding: 'utf8' })
    assert.equal(result.status, 0, result.stderr)
  }
  assert.match(run(dir, '--reference', repo).stderr, /selected tag does not match manifest commit/)
}))
test('unknown manifest commit is rejected before frozen content is regenerated', () => fixture(dir => {
  const path = resolve(dir, 'maintenance/package-sources.json')
  const data = JSON.parse(readFileSync(path, 'utf8'))
  data.packages.find(p => p.docsPage === 'laravel-cart.md').commit = 'f'.repeat(40)
  writeFileSync(path, JSON.stringify(data))
  assert.match(run(dir).stderr, /Source commit changed/)
}))
test('reviewed adapter bytes are frozen inputs and copied to site pages', () => fixture(dir => {
  const evidence = JSON.parse(readFileSync(resolve(dir, 'maintenance/evidence/cart-import.json'), 'utf8'))
  assert.ok(evidence.adapters.length > 0)
  const adapter = evidence.adapters[0]
  assert.equal(readFileSync(resolve(dir, adapter.path), 'utf8'), readFileSync(resolve(dir, 'laravel-cart', adapter.path.split('/').at(-1)), 'utf8'))
  writeFileSync(resolve(dir, adapter.path), readFileSync(resolve(dir, adapter.path), 'utf8') + '\nchanged\n')
  assert.match(run(dir, '--check').stderr, /Outdated Cart import|adapter input hash mismatch/)
}))
