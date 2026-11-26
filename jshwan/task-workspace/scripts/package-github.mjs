import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const root=process.cwd();
const output=path.join(root,'outputs');fs.mkdirSync(output,{recursive:true});
const stage=path.join(output,'github-source','task-workspace');fs.mkdirSync(stage,{recursive:true});
const excluded=new Set(['.git','node_modules','dist','.next','.vinext','.wrangler','.sites-runtime','outputs','work','.agents','.codex','next-env.d.ts']);
function copy(src,dst){for(const item of fs.readdirSync(src,{withFileTypes:true})){if(excluded.has(item.name)||item.name.startsWith('.env')||item.name.startsWith('.dev.vars')||item.name.endsWith('.tsbuildinfo')||item.name.endsWith('.log'))continue;const a=path.join(src,item.name),b=path.join(dst,item.name);if(item.isDirectory()){fs.mkdirSync(b,{recursive:true});copy(a,b);}else if(item.isFile())fs.copyFileSync(a,b);}}
copy(root,stage);
const zip=path.join(output,'task-workspace-github.zip');
const result=spawnSync('tar',['-a','-cf',zip,'-C',path.dirname(stage),'task-workspace'],{stdio:'inherit'});
if(result.status!==0)throw new Error('Source archive failed');
console.log(zip);
