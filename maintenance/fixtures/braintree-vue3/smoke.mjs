// Node >= 22.13. Executes pinned source with entirely synthetic Vue/SDK boundaries.
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { stripTypeScriptTypes } from 'node:module'
import vm from 'node:vm'
import { execFileSync } from 'node:child_process'
const root = process.argv[2]
if (!root) throw new Error('Pass the pinned braintree-vue3 checkout directory')
assert.equal(execFileSync('git', ['-C', root, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), 'ff99c39e9fd45e6fe43440f8c3b7bcda58e01775')
assert.equal(execFileSync('git', ['-C', root, 'diff', 'HEAD', '--', 'src'], { encoding: 'utf8' }), '')
const hooks = { mounted: [], unmount: [], watchers: [] }
const state = { reject: false, creates: 0, teardown: 0 }
const sdkClient = { teardown() { state.teardown++ } }
const vue = {
  ref: value => ({ value }), shallowRef: value => ({ value }), provide() {},
  onMounted: fn => hooks.mounted.push(fn), onBeforeUnmount: fn => hooks.unmount.push(fn),
  watch(get, cb, opts) { hooks.watchers.push({ get, cb }); if (opts?.immediate) cb(get()) },
}
function load(file, names, sdk) {
  let source = stripTypeScriptTypes(readFileSync(`${root}/src/composables/${file}.ts`, 'utf8'))
  source = source.replace(/^import .* from .*$/gm, '').replace(/^export /gm, '')
  return vm.runInNewContext(`(function(){${source}; return {${names}}})()`, {
    ...vue, ...sdk, BraintreeClientKey: Symbol(), Error,
  })
}
const { useBraintreeClient } = load('useBraintreeClient', 'useBraintreeClient', {
  braintreeClient: { async create({ authorization }) {
    assert.equal(authorization, 'synthetic-client-token')
    state.creates++
    if (state.reject) throw new Error('synthetic init failure')
    return sdkClient
  } },
})
const client = useBraintreeClient('synthetic-client-token')
assert.equal(client.isReady.value, false)
await hooks.mounted[0]()
assert.equal(client.isReady.value, true)
await client.initialize()
assert.equal(state.creates, 1)
await client.reinitialize()
assert.equal(state.teardown, 1)
state.reject = true
await client.reinitialize()
assert.equal(client.error.value.message, 'synthetic init failure')
assert.equal(client.isReady.value, false)
const { useHostedFields } = load('useHostedFields', 'useHostedFields', {
  hostedFields: { async create() { return {
    on() {}, tokenize: async () => ({ nonce: 'synthetic-nonce' }), clear() {}, teardown() {},
  } } },
})
const hosted = useHostedFields({ client: { value: null }, fields: { number: { container: '#number' } } })
await assert.rejects(hosted.tokenize(), /not ready/)
await hooks.watchers.at(-1).cb(sdkClient)
assert.equal(hosted.isReady.value, true)
assert.equal((await hosted.tokenize()).nonce, 'synthetic-nonce')
console.log(JSON.stringify({ result: 'passed', checks: ['client lifecycle', 'duplicate initialize guard', 'reinitialize', 'initialization error', 'hosted not-ready error', 'mock tokenization'], network: 'none; SDK mocked', node: process.version }, null, 2))
