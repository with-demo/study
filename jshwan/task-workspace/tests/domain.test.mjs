import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyWorkspace, visibleTasks, progress, changeStatus, trashProject, restoreProject} from '../app/domain.ts';
const now='2026-11-26T00:00:00.000Z';
const makeTask=(id,extra={})=>({id,title:id,description:'',status:'todo',priority:'normal',due:'',projectId:'p1',tags:[],checklist:[],createdAt:now,updatedAt:now,completedAt:null,deletedAt:null,deletedBy:null,...extra});
function fixture(){const s=emptyWorkspace();s.projects=[{id:'p1',name:'Project',description:'',target:'',status:'active',color:'#7160dc',archived:false,deletedAt:null,createdAt:now,updatedAt:now}];s.tasks=[makeTask('t1'),makeTask('t2',{status:'done',completedAt:now}),makeTask('t3',{deletedAt:now})];return s;}
test('project completion excludes deleted tasks and zero tasks is zero',()=>{const s=fixture();assert.equal(progress(s,'p1'),50);assert.equal(progress(s,'missing'),0);});
test('reopening clears completion timestamp while checklist stays independent',()=>{const t=makeTask('t');t.checklist=[{id:'c',title:'subtask',done:true}];assert.equal(t.status,'todo');changeStatus(t,'done',now);assert.equal(t.completedAt,now);changeStatus(t,'doing',now);assert.equal(t.completedAt,null);assert.equal(t.checklist[0].done,true);});
test('archive hides tasks and restore returns them without duplicating records',()=>{const s=fixture();assert.equal(visibleTasks(s).length,2);s.projects[0].archived=true;assert.equal(visibleTasks(s).length,0);s.projects[0].archived=false;assert.equal(visibleTasks(s).length,2);});
test('project restore does not resurrect an independently deleted task',()=>{const s=fixture();trashProject(s,s.projects[0],now);assert.equal(visibleTasks(s).length,0);assert.equal(s.tasks[2].deletedBy,null);restoreProject(s,s.projects[0],now);assert.equal(visibleTasks(s).length,2);assert.equal(s.tasks[2].deletedAt,now);});
