const { createRequire } = require('node:module')
const { readFileSync } = require('node:fs')
const assert = require('node:assert/strict')
const [toolchain, guide] = process.argv.slice(2)
if (!toolchain || !guide) throw new Error('Pass isolated Vue 3 toolchain directory and guide path')
const req = createRequire(`${toolchain}/package.json`)
const { parse, compileScript, compileTemplate, version } = req('@vue/compiler-sfc')
assert.match(version, /^3\./)
const blocks = [...readFileSync(guide, 'utf8').matchAll(/```vue\n([\s\S]*?)```/g)]
assert.equal(blocks.length, 2)
for (const [index, block] of blocks.entries()) {
  const filename = `Example${index}.vue`
  const parsed = parse(block[1], { filename })
  assert.deepEqual(parsed.errors, [])
  const script = compileScript(parsed.descriptor, { id: filename })
  const template = compileTemplate({ source: parsed.descriptor.template.content, filename, id: filename, compilerOptions: { bindingMetadata: script.bindings } })
  assert.deepEqual(template.errors, [])
}
console.log(JSON.stringify({ result: 'passed', compiler: `@vue/compiler-sfc@${version}`, examples: blocks.length, checks: ['SFC parse', 'compileScript', 'compileTemplate'], limitations: ['No package import resolution, TypeScript typecheck, browser mounting or hydration'], node: process.version }, null, 2))
