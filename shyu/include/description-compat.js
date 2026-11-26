/* shyu 전용 ID 변경 호환. 공통 서버·인증을 복제하지 않고 이전 설명만 추가 조회합니다. */
(()=>{
 'use strict';
 const base=window.GFAIR_COLLAB,ids=window.ShyuScreenIds,config=window.MOCKUP_SHARED_CONFIG;
 if(!base||!ids||!config?.server)return;
 const cache=new Map();
 let pending=null,legacyError='';
 const route=()=>window.MOCKUP_DESCRIPTION_CONTEXT?.id||decodeURIComponent(location.hash.slice(1))||document.body.dataset.screen;
 const notify=()=>window.dispatchEvent(new Event('collaboration-updated'));
 async function load(force=false){
  const current=route(),previous=ids.legacy(current||'');
  if(!current||current==='screens'||previous===current||!/^SH[A-Z]+-\d{2}(?:-p\d{2})?$/.test(previous))return;
  if(pending?.route===current)return pending.promise;
  if(!force&&Date.now()-(cache.get(current)?.time||0)<15000)return;
  pending?.controller.abort();
  const request={route:current,controller:new AbortController(),promise:null};
  pending=request;
  request.promise=(async()=>{
   try{
    const query=new URLSearchParams({op:'list',project:document.body.dataset.project,screen:previous});
    const response=await fetch(config.server+'/api/collab?'+query,{credentials:'omit',cache:'no-store',signal:AbortSignal.any([request.controller.signal,AbortSignal.timeout(15000)])});
    if(!response.ok)throw Error('이전 화면 ID의 설명을 불러오지 못했습니다. 다시 불러와 주세요.');
    const result=await response.json();
    if(!Array.isArray(result.records))throw Error('이전 설명의 응답을 확인하지 못했습니다.');
    if(pending===request){cache.set(current,{time:Date.now(),records:result.records});legacyError='';}
   }catch(error){if(!request.controller.signal.aborted&&pending===request){legacyError=error.message;cache.set(current,{time:Date.now(),records:cache.get(current)?.records||[]});}}
   finally{if(pending===request){pending=null;notify();}}
  })();
  return request.promise;
 }
 window.GFAIR_COLLAB=new Proxy(base,{
  get(target,key){
   if(key==='records'){
    const unique=new Map([...target.records,...(cache.get(route())?.records||[])].map(record=>[record.id,record]));
    return [...unique.values()].sort((a,b)=>String(a.created).localeCompare(String(b.created))||String(a.id).localeCompare(String(b.id))).map((record,index)=>({...record,number:index+1}));
   }
   if(key==='loaded')return target.loaded&&pending?.route!==route();
   if(key==='loading')return target.loading||pending?.route===route();
   if(key==='error')return target.error||legacyError;
   if(key==='refresh')return async(force=false)=>{await Promise.all([target.refresh(force),load(force)]);};
   if(key==='mutate')return async(op,body)=>{const result=await target.mutate(op,body);await load(true);return result;};
   const value=Reflect.get(target,key);return typeof value==='function'?value.bind(target):value;
  }
 });
 window.addEventListener('collaboration-updated',()=>{load();});
 window.addEventListener('hashchange',()=>{legacyError='';load();});
 window.addEventListener('description-context-changed',()=>{legacyError='';load();});
 load();
})();
