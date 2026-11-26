import path from 'node:path';
import {pathToFileURL} from 'node:url';
import {spawnSync} from 'node:child_process';
const modules=path.resolve(process.env.TASK_DEMO_NODE_MODULES||'node_modules');
const {build}=await import(pathToFileURL(path.join(modules,'esbuild/lib/main.js')).href);
await build({entryPoints:['tests/demo.test.ts'],outfile:'outputs/demo.test.mjs',bundle:true,format:'esm',platform:'node',target:['node22'],nodePaths:[modules]});
const result=spawnSync(process.execPath,['--test','outputs/demo.test.mjs'],{stdio:'inherit'});process.exit(result.status??1);
