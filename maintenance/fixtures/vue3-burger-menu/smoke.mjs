import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import vm from 'node:vm'
import { execFileSync } from 'node:child_process'
const [root, artifact, tag = "1.1.2"] = process.argv.slice(2)
if (!root || !artifact) throw new Error('Pass pinned source checkout and extracted npm package paths')
assert.equal(execFileSync('git', ['-C', root, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(), '27ed3fe184f55de51401590f3975011c4131f65a')
assert.equal(execFileSync('git', ['-C', root, 'diff', 'HEAD', '--', 'src'], { encoding: 'utf8' }), '')
const manifest = JSON.parse(readFileSync(`${artifact}/package.json`))
assert.equal(manifest.version, '1.0.0')
assert.equal(existsSync(`${artifact}/${manifest.main}`), false)
assert.ok(['1.0.0', '1.1.2'].includes(tag))
const commit = execFileSync('git', ['-C', root, 'rev-parse', `${tag}^{commit}`], { encoding: 'utf8' }).trim()
assert.equal(commit, '27ed3fe184f55de51401590f3975011c4131f65a')
const source = execFileSync('git', ['-C', root, 'show', `${tag}:src/components/Menu.vue`], { encoding: 'utf8' })
const script = source.match(/<script>([\s\S]*?)<\/script>/)[1]
const mounted = [], unmount = [], events = [], listeners = new Map(), classes = new Set()
const component = vm.runInNewContext(script.replace(/import .* from 'vue';/, '').replace('export default', 'result ='), {
  result: null, nextTick: fn => fn(), onMounted: fn => mounted.push(fn), onUnmounted: fn => unmount.push(fn),
  ref: value => ({ value }), toRefs: props => Object.fromEntries(Object.keys(props).map(k => [k, { value: props[k] }])),
  watch() {}, setTimeout: fn => fn(),
  document: { body: { classList: { add: x => classes.add(x), remove: x => classes.delete(x) } },
    addEventListener: (x, fn) => listeners.set(x, fn), removeEventListener: x => listeners.delete(x) },
})
const api = component.setup({ isOpen: false, right: false, width: '320', disableEsc: false }, { emit: x => events.push(x) })
api.sideNav.value = { style: {} }
mounted.forEach(fn => fn())
api.openMenu()
assert.equal(api.sideNav.value.style.width, '320px')
assert.equal(classes.has('bm-overlay'), true)
api.closeMenuOnEsc({ key: 'Escape' })
assert.equal(api.sideNav.value.style.width, '0px')
assert.equal(classes.has('bm-overlay'), false)
assert.deepEqual(events, ['openMenu', 'closeMenu'])
unmount.forEach(fn => fn())
assert.equal(listeners.size, 0)
console.log(JSON.stringify({ result: 'passed', tag, commit, checks: ['published main missing (confirmed defect)', 'source open/close events', 'pixel width', 'Escape', 'overlay', 'listener cleanup'], runtime: 'synthetic DOM/Vue boundaries; no browser rendering', node: process.version }, null, 2))
