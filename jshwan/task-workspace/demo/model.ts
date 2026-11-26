import { z } from 'zod';
import { normalizeTaskSchedule } from '../app/task-schedule';
import { changeStatus, trashProject, restoreProject } from '../app/domain';
import type { Workspace } from '../app/domain';
const date=z.string().refine(v=>v===''||(/^\d{4}-\d{2}-\d{2}$/.test(v)&&!isNaN(Date.parse(v))&&new Date(v).toISOString().slice(0,10)===v),'올바른 날짜를 입력하세요.');
const title=z.string().trim().min(1).max(200);
const status=z.enum(['todo','doing','done']);
const taskInput=z.object({title,description:z.string().max(20000).default(''),status:status.default('todo'),priority:z.enum(['high','normal','low']).default('normal'),due:date.default(''),useStartDate:z.boolean().default(false),startDate:date.default(''),projectId:z.string().max(100).default(''),tags:z.array(z.string().trim().min(1).max(50)).max(30).default([]),checklist:z.array(z.object({id:z.string().max(100),title,done:z.boolean()})).max(100).default([])});
const projectInput=z.object({name:title,description:z.string().max(20000).default(''),target:date.default(''),status:z.enum(['active','paused','done']).default('active'),color:z.string().regex(/^#[0-9a-fA-F]{6}$/).default('#6561d9')});
const settingsInput=z.object({name:title,start:z.enum(['/','/tasks','/tasks?view=today','/calendar']),weekStart:z.union([z.literal(0),z.literal(1)])});
const stamp=z.string().datetime();
const backupSchema=z.object({format:z.literal('task-workspace'),schemaVersion:z.literal(1),data:z.object({settings:settingsInput,tasks:z.array(taskInput.extend({id:z.string().min(1),createdAt:stamp,updatedAt:stamp,completedAt:stamp.nullable(),deletedAt:stamp.nullable(),deletedBy:z.string().nullable()})).max(10000),projects:z.array(projectInput.extend({id:z.string().min(1),archived:z.boolean(),deletedAt:stamp.nullable(),createdAt:stamp,updatedAt:stamp})).max(1000)})});

export const commandSchema=z.object({version:z.number().int().nonnegative(),action:z.string(),id:z.string().optional(),payload:z.unknown().optional()});
export function applyCommand(data:Workspace,cmd:z.infer<typeof commandSchema>){
 let s=structuredClone(data);const now=new Date().toISOString();
  const task=()=>{const t=s.tasks.find(t=>t.id===cmd.id);if(!t)throw Error('작업을 찾을 수 없습니다.');return t;};
  const project=()=>{const p=s.projects.find(p=>p.id===cmd.id);if(!p)throw Error('프로젝트를 찾을 수 없습니다.');return p;};
  const checkProject=(id:string)=>{if(id&&!s.projects.some(p=>p.id===id&&!p.deletedAt&&!p.archived))throw Error('사용 가능한 프로젝트를 선택하세요.');};
  let createdId:string|undefined;
  switch(cmd.action){
   case 'task.save': {const input=normalizeTaskSchedule(taskInput.parse(cmd.payload));checkProject(input.projectId);if(cmd.id){const t=task();if(t.deletedAt)throw Error('삭제된 작업입니다.');const oldStatus=t.status;Object.assign(t,input,{status:oldStatus});changeStatus(t,input.status,now);}else{createdId=crypto.randomUUID();s.tasks.push({...input,id:createdId,createdAt:now,updatedAt:now,completedAt:input.status==='done'?now:null,deletedAt:null,deletedBy:null});}break;}
   case 'task.status':{const t=task();if(t.deletedAt)throw Error('삭제된 작업입니다.');changeStatus(t,status.parse(cmd.payload),now);break;}
   case 'task.duplicate':{const t=task();checkProject(t.projectId);createdId=crypto.randomUUID();s.tasks.push({...structuredClone(t),id:createdId,title:t.title.slice(0,195)+' (복사)',status:'todo',createdAt:now,updatedAt:now,completedAt:null,deletedAt:null,deletedBy:null,checklist:t.checklist.map(c=>({...c,id:crypto.randomUUID(),done:false}))});break;}
   case 'task.trash':{const t=task();t.deletedAt=now;t.deletedBy=null;t.updatedAt=now;break;}
   case 'task.restore':{const t=task();if(t.projectId&&s.projects.find(p=>p.id===t.projectId)?.deletedAt)throw Error('소속 프로젝트를 먼저 복원해주세요.');t.deletedAt=null;t.deletedBy=null;t.updatedAt=now;break;}
   case 'task.purge':{const t=task();if(!t.deletedAt)throw Error('휴지통에서만 영구 삭제할 수 있습니다.');s.tasks=s.tasks.filter(x=>x.id!==t.id);break;}
   case 'task.bulk':{const p=z.object({ids:z.array(z.string()).min(1),status:status.optional(),projectId:z.string().optional()}).parse(cmd.payload);if(p.projectId!==undefined)checkProject(p.projectId);if(p.ids.some(id=>!s.tasks.some(t=>t.id===id&&!t.deletedAt)))throw Error('일부 선택 작업을 찾을 수 없어 변경하지 않았습니다.');s.tasks.forEach(t=>{if(p.ids.includes(t.id)){if(p.status)changeStatus(t,p.status,now);if(p.projectId!==undefined)t.projectId=p.projectId;t.updatedAt=now;}});break;}
   case 'project.save':{const input=projectInput.parse(cmd.payload);if(cmd.id){const p=project();if(p.deletedAt)throw Error('삭제된 프로젝트입니다.');Object.assign(p,input,{updatedAt:now});}else{createdId=crypto.randomUUID();s.projects.push({...input,id:createdId,archived:false,deletedAt:null,createdAt:now,updatedAt:now});}break;}
   case 'project.archive':{const p=project();p.archived=true;p.updatedAt=now;break;}
   case 'project.unarchive':{const p=project();p.archived=false;p.updatedAt=now;break;}
   case 'project.trash':trashProject(s,project(),now);break;
   case 'project.restore':restoreProject(s,project(),now);break;
   case 'project.purge':{const p=project();if(!p.deletedAt)throw Error('휴지통에서만 영구 삭제할 수 있습니다.');s.projects=s.projects.filter(x=>x.id!==p.id);s.tasks=s.tasks.filter(t=>t.projectId!==p.id);break;}
   case 'settings.save':s.settings=settingsInput.parse(cmd.payload);break;
   case 'backup.import':{
    const b=backupSchema.parse(cmd.payload).data;b.tasks.forEach(normalizeTaskSchedule);const ids=[...b.projects,...b.tasks].map(x=>x.id);if(new Set(ids).size!==ids.length)throw Error('중복 ID가 있는 백업입니다.');
    if(b.tasks.some(t=>t.projectId&&!b.projects.some(p=>p.id===t.projectId)))throw Error('프로젝트 연결이 유효하지 않습니다.');
    if(b.tasks.some(t=>(t.status==='done')!==!!t.completedAt || (t.deletedBy&&(!t.deletedAt||t.deletedBy!==t.projectId||!b.projects.find(p=>p.id===t.projectId)?.deletedAt)) || (!t.deletedAt&&b.projects.find(p=>p.id===t.projectId)?.deletedAt)))throw Error('백업의 완료 또는 삭제 상태가 일치하지 않습니다.');
    const map=new Map(ids.map(id=>[id,crypto.randomUUID()]));s={settings:b.settings,projects:b.projects.map(p=>({...p,id:map.get(p.id)!,updatedAt:now})),tasks:b.tasks.map(t=>({...t,id:map.get(t.id)!,projectId:t.projectId?map.get(t.projectId)!:'',deletedBy:t.deletedBy?map.get(t.deletedBy)!:null,updatedAt:now,checklist:t.checklist.map(c=>({...c,id:crypto.randomUUID()}))}))} as Workspace;break;
   }
   default:throw Error('지원하지 않는 요청입니다.');
  }

 return {data:s,createdId};
}
export function validateData(data:unknown):Workspace{const parsed=backupSchema.parse({format:'task-workspace',schemaVersion:1,data}).data;parsed.tasks.forEach(normalizeTaskSchedule);return parsed as Workspace;}
