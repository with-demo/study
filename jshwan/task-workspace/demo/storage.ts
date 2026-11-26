import { z } from 'zod';
import { emptyWorkspace } from '../app/domain';
import { applyCommand, commandSchema, validateData } from './model';
export const STORAGE_KEY='study.jshwan.task-workspace.v1';
const SESSION_KEY='study.jshwan.task-workspace.demo-session';
let entered=false;
export function demoSignIn(){entered=true;try{sessionStorage.setItem(SESSION_KEY,'entered');}catch{/* Demo entry does not require storage or credentials. */}}
export function demoSignOut(){entered=false;try{sessionStorage.removeItem(SESSION_KEY);}catch{}}
function hasSession(){try{return entered||sessionStorage.getItem(SESSION_KEY)==='entered';}catch{return entered;}}
function readWorkspace(){const raw=localStorage.getItem(STORAGE_KEY);if(!raw)return {data:emptyWorkspace(),version:0};const saved=JSON.parse(raw);if(saved.schemaVersion!==1||!Number.isSafeInteger(saved.version)||saved.version<0)throw Error('저장된 데이터 형식을 읽을 수 없습니다. 기존 데이터는 변경하지 않았습니다.');return {data:validateData(saved.data),version:saved.version};}
function json(data:unknown,status=200){return Response.json(data,{status});}
export async function demoRequest(_url:string,init?:RequestInit):Promise<Response>{
 if(!hasSession())return json({error:'데모 로그인 버튼으로 입장해주세요.'},401);
 try{
  const current=readWorkspace();
  if(!init?.method||init.method==='GET')return json({...current,user:{name:'스터디 사용자',email:'계정 없이 체험 중'}});
  const raw=String(init.body??'');if(raw.length>3000000)return json({error:'백업은 3MB 이하여야 합니다.'},413);
  const cmd=commandSchema.parse(JSON.parse(raw));
  if(cmd.version!==current.version)return json({error:'다른 탭에서 내용이 변경되었습니다. 입력은 유지됩니다. 최신 목록을 확인한 후 다시 저장해주세요.',conflict:true},409);
  const result=applyCommand(current.data,cmd);
  // Synchronous read/modify/write inside the origin lock avoids cross-tab lost updates.
  localStorage.setItem(STORAGE_KEY,JSON.stringify({schemaVersion:1,version:current.version+1,data:result.data}));
  return json({...result,version:current.version+1});
 }catch(e){
  if(e instanceof z.ZodError)return json({error:'입력 형식을 확인해주세요. '+e.issues[0].message},400);
  if(e instanceof DOMException)return json({error:'브라우저 저장 공간을 사용할 수 없습니다. 저장 권한 또는 남은 공간을 확인하고 다시 시도해주세요. 입력 내용은 유지됩니다.'},503);
  return json({error:e instanceof Error?e.message:'브라우저 저장에 실패했습니다. 입력 내용은 유지됩니다.'},400);
 }
}
export async function lockedDemoRequest(url:string,init?:RequestInit){
 if(init?.method==='POST'&&typeof navigator!=='undefined'&&navigator.locks)return navigator.locks.request(STORAGE_KEY,()=>demoRequest(url,init));
 return demoRequest(url,init);
}
