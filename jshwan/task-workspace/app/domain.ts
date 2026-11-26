export type Status = 'todo' | 'doing' | 'done';
export type Task = { id:string; title:string; description:string; status:Status; priority:'high'|'normal'|'low'; due:string; useStartDate:boolean; startDate:string; projectId:string; tags:string[]; checklist:{id:string;title:string;done:boolean}[]; createdAt:string; updatedAt:string; completedAt:string|null; deletedAt:string|null; deletedBy:string|null };
export type Project = { id:string; name:string; description:string; target:string; status:'active'|'paused'|'done'; color:string; archived:boolean; deletedAt:string|null; createdAt:string; updatedAt:string };
export type Workspace = { settings:{name:string;start:string;weekStart:number}; tasks:Task[]; projects:Project[] };
export const emptyWorkspace = ():Workspace => ({settings:{name:'나의 작업 공간',start:'/',weekStart:1},tasks:[],projects:[]});
export const todaySeoul = () => new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Seoul',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
export const visibleTasks = (s:Workspace) => s.tasks.filter(t=>!t.deletedAt && (!t.projectId || s.projects.some(p=>p.id===t.projectId&&!p.deletedAt&&!p.archived)));
export const progress = (s:Workspace,id:string) => {const ts=s.tasks.filter(t=>t.projectId===id&&!t.deletedAt);return ts.length?Math.round(ts.filter(t=>t.status==='done').length/ts.length*100):0;};
export function changeStatus(t:Task,status:Status,now:string) { t.completedAt=status==='done'?(t.completedAt||now):null;t.status=status;t.updatedAt=now; }
export function trashProject(s:Workspace,p:Project,now:string){p.deletedAt=now;p.updatedAt=now;s.tasks.forEach(t=>{if(t.projectId===p.id&&!t.deletedAt){t.deletedAt=now;t.deletedBy=p.id;t.updatedAt=now;}});}
export function restoreProject(s:Workspace,p:Project,now:string){p.deletedAt=null;p.updatedAt=now;s.tasks.forEach(t=>{if(t.deletedBy===p.id){t.deletedAt=null;t.deletedBy=null;t.updatedAt=now;}});}
