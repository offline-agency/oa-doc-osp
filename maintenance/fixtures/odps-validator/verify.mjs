import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { createRequire } from 'node:module';
import { execFileSync } from 'node:child_process';
const source=process.env.ODPS_SOURCE, repository=process.env.ODPS_REPOSITORY;
assert.ok(source && repository,'Set ODPS_SOURCE (isolated installed release) and ODPS_REPOSITORY (read-only reference clone)');
const commit='bed32b74b2cf353bfebb134aab9dfb41ac033d81';
assert.equal(execFileSync('git',['-C',repository,'rev-parse','1.0.1^{commit}'],{encoding:'utf8'}).trim(),commit);
for(const file of ['package.json','package-lock.json','pages/index.js','next.config.js','public/schemas/v3.0/odps.yaml','public/schemas/v3.1/odps.yaml'])assert.equal(fs.readFileSync(path.join(source,file),'utf8'),execFileSync('git',['-C',repository,'show',commit+':'+file],{encoding:'utf8'}),file+' matches released source');
const require=createRequire(path.join(source,'package.json'));
const YAML=require('js-yaml'), ActualAjv=require('ajv');
assert.equal(require('ajv/package.json').version,'8.17.1');assert.equal(require('js-yaml/package.json').version,'4.1.0');
const warnings=[];
class Ajv extends ActualAjv {constructor(options){super({...options,logger:{log(){},error(){},warn(message){warnings.push(message)}}});}}
const page=fs.readFileSync(path.join(source,'pages/index.js'),'utf8');
const body=page.match(/const handleSubmit = async \(e\) => \{([\s\S]*?)\n  \};/)[1];
const staticProps=page.slice(page.indexOf('export async function getStaticProps()')).replace(/^export /,'');
const available=await new vm.Script(staticProps+'\ngetStaticProps()').runInNewContext({fs,path,process:{cwd:()=>source}});
assert.deepEqual(Array.from(available.props.versions),['v3.0','v3.1']);
async function validate(version,content,missing=false){
 let result,requests=0;
 const context={Ajv,YAML,version,content,setResult:value=>{result=value},fetch:async url=>{
  requests++;assert.equal(url,`/schemas/${version}/odps.yaml`);
  return {ok:!missing,statusText:'Not Found',text:async()=>fs.readFileSync(path.join(source,'public',url.slice(1)),'utf8')};
 }};
 await new vm.Script('(async e => {'+body+'})').runInNewContext(context)({preventDefault(){}});
 assert.equal(requests,1);return result;
}
const validYaml='schema: https://example.invalid/odps.yaml\nversion: "3.1"\nproduct:\n  en:\n    name: Synthetic example\n';
assert.equal((await validate('v3.1',validYaml)).valid,true);
assert.equal((await validate('v3.1',JSON.stringify(YAML.load(validYaml)))).valid,true);
const invalid=await validate('v3.1',validYaml.replace('"3.1"','3.1'));
assert.equal(invalid.valid,false);assert.ok(invalid.errors.some(error=>error.instancePath==='/version' && error.keyword==='type'));
assert.ok((await validate('v3.1','product: [unterminated')).error);
assert.match((await validate('v3.1',validYaml,true)).error,/Failed to load local schema/);
assert.equal((await validate('v3.1','42')).valid,true,'No root type restriction in shipped schema');
assert.equal((await validate('v3.1','')).valid,true,'Empty YAML loads undefined; shipped schema does not reject nonobjects');
assert.equal((await validate('v3.1',validYaml.replace('"3.1"','"2.0"'))).valid,true,'Version property has no const matching the selected folder');
assert.equal((await validate('v3.1',validYaml.replace('https://example.invalid/odps.yaml','not-a-uri'))).valid,true,'uri format not installed by the application');
assert.equal((await validate('v3.0','schema: example\nversion: "3.0"\nproduct: {}')).valid,false,'v3.0 requires further top-level keys');
assert.ok(warnings.some(message=>message.includes('unknown format')));
const guide=fs.readFileSync(new URL('../../../odps-validator.md',import.meta.url),'utf8');
assert.ok(guide.includes(validYaml.trim()),'Quickstart matches actual tested YAML');
console.log('PASS: released handler/static props, actual v3.0/v3.1 folders, YAML/JSON success, type/parse/missing-schema errors, and documented permissive-schema limitations; no live requests. Node '+process.version+'; Ajv8.17.1/js-yaml4.1.0.');
