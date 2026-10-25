/* 스터디 전용 브라우저 저장 어댑터. 인증·공동 서버 저장 기능이 아닙니다. */
(()=>{
'use strict';
const project=document.body.dataset.project||'study',key='study.descriptions.v1.'+project,userKey='study.author.v1';
let data={screens:{}},error='';
const current=()=>decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen||'screens';
function read(){try{const raw=localStorage.getItem(key);if(raw){const parsed=JSON.parse(raw);if(!parsed.screens||typeof parsed.screens!=='object'||Array.isArray(parsed.screens))throw Error();data=parsed;}error='';}catch{error='저장 자료를 읽지 못했습니다. JSON 백업을 확인해 주세요.';}}
const changed=()=>window.dispatchEvent(new Event('collaboration-updated'));
const author=()=>localStorage.getItem(userKey)||'';
const validateRecord=r=>r&&typeof r.id==='string'&&typeof r.text==='string'&&r.text.length<=5000&&r.anchor&&typeof r.anchor.selector==='string'&&Number.isFinite(r.anchor.x)&&Number.isFinite(r.anchor.y)&&Array.isArray(r.comments)&&r.comments.length===0&&Number.isInteger(r.revision)&&r.revision>0;
read();
const store={get user(){return author()?{name:author(),editor:true}:null;},githubReady:true,get records(){return data.screens[current()]||[];},loading:false,loaded:true,get error(){return error;},
async login(){document.getElementById('study-author-dialog').showModal();},async logout(){document.getElementById('study-author-dialog').showModal();},
async refresh(){read();changed();},
async planningNotes(){return Object.entries(data.screens).flatMap(([screen,list])=>list.flatMap(r=>{try{const v=JSON.parse(r.text);return v.planningNote?[{...r,screen,item:v.item,planningNote:v.planningNote}]:[];}catch{return [];}}));},
async mutate(op,body){
if(!author())throw Error('먼저 작성자 이름을 설정해 주세요.');
read();if(error)throw Error(error);
const next=structuredClone(data),screen=body.screen||current(),list=next.screens[screen]||[];next.screens[screen]=list;
const now=new Date().toISOString();let result;
if(op==='create'){
 if(screen!==current())throw Error('현재 화면을 다시 확인해 주세요.');
 result={id:crypto.randomUUID(),text:body.text,anchor:body.anchor,number:list.filter(r=>{try{return JSON.parse(r.text).format==='description-spec-v1';}catch{return true;}}).length+1,author:author(),created:now,revision:1,comments:[]};
 if(!validateRecord(result))throw Error('설명 내용과 연결 영역을 확인해 주세요.');list.push(result);
}else{
 const i=list.findIndex(r=>r.id===body.id);if(i<0)throw Error('설명을 찾지 못했습니다.');result=list[i];
 if(result.revision!==body.revision)throw Error('다른 사용자가 수정했습니다. 다시 불러와 주세요.');
 if(op==='delete'){list.splice(i,1);}else if(op==='update'){if(typeof body.text!=='string'||body.text.length>5000)throw Error('설명은 5,000자 이하로 작성해 주세요.');result.text=body.text;}else if(op==='move'){if(!Number.isFinite(body.offsetX)||!Number.isFinite(body.offsetY))throw Error('핀 위치를 확인해 주세요.');result.anchor={...result.anchor,offsetX:body.offsetX,offsetY:body.offsetY};}else throw Error('지원하지 않는 작업입니다.');
 result.revision++;result.updated=now;result.updatedBy=author();
}
let n=0;list.forEach(r=>{try{if(['screen-overview-v1','screen-message-v1'].includes(JSON.parse(r.text).format))return;}catch{}r.number=++n;});
try{localStorage.setItem(key,JSON.stringify(next));}catch{throw Error('브라우저 저장 공간이 부족하거나 저장이 차단됐습니다. JSON 백업 후 다시 시도해 주세요.');}data=next;changed();return result;
},exportData(){return JSON.stringify({format:'study-descriptions-v1',project,exportedAt:new Date().toISOString(),screens:data.screens},null,2);},
importData(text){if(text.length>2000000)throw Error('2MB 이하 파일을 선택해 주세요.');const v=JSON.parse(text);const ids=new Set();if(v.format!=='study-descriptions-v1'||v.project!==project||!v.screens||typeof v.screens!=='object'||Array.isArray(v.screens))throw Error('이 스터디에서 내보낸 JSON 파일을 선택해 주세요.');for(const [screen,list]of Object.entries(v.screens)){if(['__proto__','constructor','prototype'].includes(screen)||!/^[A-Za-z0-9_-]+$/.test(screen)||!Array.isArray(list)||list.some(r=>!validateRecord(r)||ids.has(r.id)||(ids.add(r.id),false)))throw Error('파일의 화면 또는 설명 형식을 확인해 주세요.');}const next=structuredClone(data);for(const [screen,list] of Object.entries(v.screens)){const existing=next.screens[screen]||[];let count=0;list.forEach(r=>{if(!existing.some(x=>x.id===r.id)){existing.push(r);count++;}});next.screens[screen]=existing;let n=0;existing.forEach(r=>{try{if(['screen-overview-v1','screen-message-v1'].includes(JSON.parse(r.text).format))return;}catch{}r.number=++n;});}localStorage.setItem(key,JSON.stringify(next));data=next;changed();}
};window.GFAIR_COLLAB=store;
window.addEventListener('hashchange',changed);window.addEventListener('storage',e=>{if([key,userKey].includes(e.key))store.refresh();});setInterval(()=>store.refresh(),60000);
const dialog=document.createElement('dialog');dialog.id='study-author-dialog';dialog.className='annotation-dialog';dialog.innerHTML='<form method="dialog"><div class="annotation-dialog-header"><h2>작성자 설정</h2><button formnovalidate value="cancel" aria-label="작성자 설정 닫기">×</button></div><p>로그인이 아닙니다. 설명은 이 브라우저에만 저장됩니다.</p><label>작성자 이름 <input name="author" required maxlength="40" autocomplete="nickname"></label><div class="annotation-actions"><button type="button" data-cancel>취소</button><button type="submit" value="save">설정</button></div></form>';
dialog.querySelector('input').value=author();dialog.querySelector('[data-cancel]').onclick=()=>dialog.close();dialog.querySelector('form').addEventListener('submit',e=>{if(e.submitter?.value==='cancel')return;const value=dialog.querySelector('input').value.trim();if(!value){e.preventDefault();return;}try{localStorage.setItem(userKey,value);}catch{e.preventDefault();alert('브라우저 저장이 차단되어 있습니다.');return;}changed();});document.body.append(dialog);
})();
