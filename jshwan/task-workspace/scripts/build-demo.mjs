import fs from 'node:fs/promises';
import path from 'node:path';
import {pathToFileURL} from 'node:url';
const modules=path.resolve(process.env.TASK_DEMO_NODE_MODULES||'node_modules');
const {build}=await import(pathToFileURL(path.join(modules,'esbuild/lib/main.js')).href);
await fs.mkdir('demo-assets',{recursive:true});
await build({entryPoints:['demo/main.tsx'],outfile:'demo-assets/app.js',bundle:true,format:'esm',platform:'browser',target:['es2022'],minify:true,jsx:'automatic',nodePaths:[modules],define:{'process.env.NODE_ENV':'"production"'},legalComments:'linked',metafile:true}).then(async result=>{await fs.mkdir('outputs',{recursive:true});await fs.writeFile('outputs/demo-build.json',JSON.stringify(result.metafile,null,2));});
console.log('GitHub Pages demo built: index.html + demo-assets/');
