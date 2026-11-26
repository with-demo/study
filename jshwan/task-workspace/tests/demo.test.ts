import { test,beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import { demoRequest,demoSignIn,demoSignOut,STORAGE_KEY } from '../demo/storage';
class MemoryStorage{data=new Map<string,string>();getItem(k:string){return this.data.get(k)??null;}setItem(k:string,v:string){this.data.set(k,v);}removeItem(k:string){this.data.delete(k);}clear(){this.data.clear();}}
const local=new MemoryStorage(),session=new MemoryStorage();
Object.defineProperty(globalThis,'localStorage',{value:local,configurable:true});Object.defineProperty(globalThis,'sessionStorage',{value:session,configurable:true});
beforeEach(()=>{local.clear();session.clear();demoSignOut();Object.defineProperty(globalThis,'localStorage',{value:local,configurable:true});});
const get=async()=>{const r=await demoRequest('/api/workspace');return {status:r.status,body:await r.json() as any};};
const post=async(action:string,payload?:unknown,id?:string,version?:number)=>{if(version===undefined)version=(await get()).body.version;const r=await demoRequest('/api/workspace',{method:'POST',body:JSON.stringify({action,payload,id,version})});return {status:r.status,body:await r.json() as any};};
test('one-click demo entry needs no credentials or network',async()=>{const oldFetch=globalThis.fetch;globalThis.fetch=async()=>{throw Error('Unexpected network');};try{assert.equal((await get()).status,401);demoSignIn();const r=await get();assert.equal(r.status,200);assert.equal(r.body.user.name,'스터디 사용자');assert.equal(r.body.data.tasks.length,0);}finally{globalThis.fetch=oldFetch;}});
test('tasks survive logout and re-entry in the same browser',async()=>{demoSignIn();await post('task.save',{title:'스터디 검증'});demoSignOut();assert.equal((await get()).status,401);demoSignIn();assert.equal((await get()).body.data.tasks[0].title,'스터디 검증');assert.ok(local.getItem(STORAGE_KEY));});
test('invalid task input leaves browser data unchanged',async()=>{demoSignIn();assert.equal((await post('task.save',{title:'  '})).status,400);assert.equal((await post('task.save',{title:'bad',due:'2026-02-30'})).status,400);assert.equal((await get()).body.version,0);});
test('completion and reopen update the same task across views',async()=>{demoSignIn();const r=await post('task.save',{title:'One'});const id=r.body.createdId;const done=await post('task.status','done',id);assert.ok(done.body.data.tasks[0].completedAt);const reopened=await post('task.status','todo',id);assert.equal(reopened.body.data.tasks[0].completedAt,null);assert.equal(reopened.body.data.tasks.length,1);});
test('stale tab versions cannot silently overwrite newer saves',async()=>{demoSignIn();await post('task.save',{title:'Current'},undefined,0);const r=await post('task.save',{title:'Stale'},undefined,0);assert.equal(r.status,409);assert.equal((await get()).body.data.tasks.length,1);});
test('browser storage failure does not report saved data',async()=>{demoSignIn();Object.defineProperty(globalThis,'localStorage',{value:{getItem:()=>null,setItem:()=>{throw new DOMException('full','QuotaExceededError');}},configurable:true});const r=await post('task.save',{title:'Unsaved'},undefined,0);assert.equal(r.status,503);assert.match(r.body.error,/저장 공간/);assert.equal(local.data.size,0);});
test('project restore preserves independently deleted tasks',async()=>{demoSignIn();const p=(await post('project.save',{name:'Study'})).body.createdId;const a=(await post('task.save',{title:'A',projectId:p})).body.createdId;const b=(await post('task.save',{title:'B',projectId:p})).body.createdId;await post('task.trash',undefined,b);await post('project.trash',undefined,p);const r=await post('project.restore',undefined,p);assert.equal(r.body.data.tasks.find((t:any)=>t.id===a).deletedAt,null);assert.ok(r.body.data.tasks.find((t:any)=>t.id===b).deletedAt);});
test('backup replacement rejects malformed and duplicate data',async()=>{demoSignIn();await post('task.save',{title:'Keep'});const data=(await get()).body.data;const duplicate=structuredClone(data);duplicate.tasks.push(duplicate.tasks[0]);assert.equal((await post('backup.import',{format:'task-workspace',schemaVersion:1,data:duplicate})).status,400);assert.equal((await get()).body.data.tasks[0].title,'Keep');assert.equal((await post('backup.import',{format:'task-workspace',schemaVersion:1,data})).status,200);});
test('corrupt stored data is not overwritten with an empty workspace',async()=>{demoSignIn();local.setItem(STORAGE_KEY,'not-json');assert.equal((await get()).status,400);assert.equal(local.getItem(STORAGE_KEY),'not-json');});

import { studyScreens, screenIdForRoute, updateDescriptionContext } from '../demo/routing';
import { descriptions, popupDescriptions, descriptionFor } from '../demo/descriptions';
test('screen descriptions cover every selectable route and distinguish project tabs',()=>{
 for(const screen of studyScreens)assert.ok(descriptionFor(screenIdForRoute(screen.route)),screen.id);
 assert.equal(screenIdForRoute('/projects/one'),'JST-PROJ-02');
 assert.equal(screenIdForRoute('/projects/two?tab=list'),'JST-PROJ-03');
 assert.equal(screenIdForRoute('/projects/one?tab=board'),'JST-PROJ-04');
 assert.notEqual(screenIdForRoute('/tasks?view=overdue'),screenIdForRoute('/tasks?view=doing'));
 assert.equal(screenIdForRoute('/screens'),'screens');
 assert.equal(descriptionFor('screens'),undefined);
});
test('popup context follows its parent and clears when returning to a page',()=>{
 const oldDocument=globalThis.document,oldWindow=globalThis.window;
 try{
  Object.defineProperty(globalThis,'document',{value:{body:{dataset:{}}},configurable:true});
  Object.defineProperty(globalThis,'window',{value:{dispatchEvent:()=>true},configurable:true});
  for(const [kind,suffix] of [['task','p01'],['project','p02'],['search','p03']] as const){
   updateDescriptionContext('/projects/demo?tab=board',kind);
   const id=(window as any).MOCKUP_DESCRIPTION_CONTEXT.id;
   assert.equal(id,'JST-PROJ-04-'+suffix);assert.equal(descriptionFor(id),popupDescriptions[suffix]);
  }
  updateDescriptionContext('/login',null);
  assert.equal(document.body.dataset.screen,'JST-AUTH-01');
  assert.equal((window as any).MOCKUP_DESCRIPTION_CONTEXT,undefined);
 }finally{
  Object.defineProperty(globalThis,'document',{value:oldDocument,configurable:true});
  Object.defineProperty(globalThis,'window',{value:oldWindow,configurable:true});
 }
});
test('every published description has the five required planning fields and exception guidance',()=>{
 for(const [id,spec] of [...Object.entries(descriptions),...Object.entries(popupDescriptions)]){
  assert.ok(spec.overview.trim(),id);assert.ok(spec.messages.length,id);
  for(const item of spec.items)for(const key of ['item','type','defaultValue','required','detail'] as const)assert.ok(item[key].trim(),id+':'+key);
 }
});
