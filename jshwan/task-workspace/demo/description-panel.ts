import { descriptionFor, type ScreenDescription } from './descriptions';
const w=window as unknown as Record<string,unknown>;
const overlay=document.createElement('div');overlay.className='task-spec-pins';document.body.append(overlay);
let renderedId='',rendered:ScreenDescription|undefined,queued=false;
function el<K extends keyof HTMLElementTagNameMap>(tag:K,text?:string,className?:string){
 const node=document.createElement(tag);if(text)node.textContent=text;if(className)node.className=className;return node;
}
function contextId(){return (w.MOCKUP_DESCRIPTION_CONTEXT as {id:string}|undefined)?.id||document.body.dataset.screen||'';}
function target(selector?:string){return selector?document.querySelector<HTMLElement>((w.MOCKUP_DESCRIPTION_CONTEXT?'.modal ':'#app ')+selector.split(',').join(w.MOCKUP_DESCRIPTION_CONTEXT?', .modal ':', #app ')):null;}
function pins(){
 overlay.replaceChildren();
 const view=w.GFAIR_DESCRIPTION_VIEW as {closed:boolean;full:boolean;numbers:boolean}|undefined;
 if(!view||view.closed||view.full||!view.numbers||document.body.dataset.screen==='screens')return;
 const top=document.querySelector('.ui-spec-toolbar')?.getBoundingClientRect().bottom||0;
 const occupied:{x:number;y:number}[]=[];
 rendered?.items.forEach((item,index)=>{
  const node=target(item.selector);if(!node||!node.getClientRects().length)return;
  const r=node.getBoundingClientRect();if(r.bottom<top||r.top>innerHeight)return;
  let x=Math.max(14,Math.min(innerWidth-14,r.left+12)),y=Math.max(top+14,r.top+12);
  while(occupied.some(p=>Math.abs(p.x-x)<26&&Math.abs(p.y-y)<26))y+=28;
  if(y>Math.min(r.bottom+20,innerHeight-14))return;
  occupied.push({x,y});
  const button=el('button',String(index+1).padStart(2,'0'),'ui-spec-pin');
  button.type='button';button.style.left=x+'px';button.style.top=y+'px';
  button.setAttribute('aria-label',(index+1)+'번 '+item.item+' 설명 보기');
  button.onclick=()=>{const card=document.getElementById('task-spec-'+index);card?.scrollIntoView({block:'nearest',behavior:'smooth'});card?.focus({preventScroll:true});};
  overlay.append(button);
 });
}
function draw(){
 queued=false;
 const panel=document.querySelector<HTMLElement>('.ui-spec-panel');if(!panel)return;
 const id=contextId(),spec=descriptionFor(id);
 const popup=!!w.MOCKUP_DESCRIPTION_CONTEXT;
 document.body.classList.toggle('task-spec-popup',popup);
 const picker=document.querySelector<HTMLSelectElement>('[data-spec="screen"]');
 if(picker){picker.querySelector('[data-current-screen]')?.remove();const screenId=document.body.dataset.screen||'';
  if(screenId!=='screens'&&!Array.from(picker.options).some(o=>o.value===screenId)){const option=el('option',descriptionsTitle(screenId));option.value=screenId;option.dataset.currentScreen='';option.disabled=true;picker.append(option);}picker.value=screenId;
 }
 const preview=document.querySelector('.ui-spec-preview');if(preview)preview.textContent='Task 스터디 · 화면 기능 명세';
 const toggle=document.querySelector('[data-spec="close"]');if(toggle)toggle.textContent=panel.hidden?'Description 열기':'Description 닫기';
 if(panel.hidden){overlay.replaceChildren();return;}
 if(!spec){panel.replaceChildren(el('p','설명할 화면을 선택하세요.'));overlay.replaceChildren();return;}
 if(renderedId!==id||!panel.querySelector('.task-spec-document')){
  renderedId=id;rendered=spec;
  const doc=el('section',undefined,'task-spec-document');
  doc.append(el('p',id,'task-spec-id'),el('h2',spec.title),el('h3','화면 개요'),el('p',spec.overview));
  doc.append(el('p','실제 데모 기준 · GitHub에 저장된 읽기 전용 명세. 번호는 화면 영역과 연결되며, 현재 조건에서 숨겨진 영역은 번호가 표시되지 않습니다.','task-spec-note'));
  spec.items.forEach((item,index)=>{
   const card=el('article',undefined,'ui-spec-card task-spec-card');card.id='task-spec-'+index;card.tabIndex=-1;
   const heading=el('h3');
   const button=el('button',String(index+1).padStart(2,'0'),'task-spec-number');button.type='button';button.setAttribute('aria-label',(index+1)+'번 화면 영역 보기');
   button.onclick=()=>{const node=target(item.selector);if(node){node.scrollIntoView({block:'center',behavior:'smooth'});node.animate([{outline:'3px solid #c62828'},{outline:'3px solid transparent'}],{duration:1500});}else{status.textContent='이 영역은 현재 화면 조건에서 표시되지 않습니다. 관련 목록·보드·항목을 열어 확인하세요.';}};
   heading.append(button,document.createTextNode(item.item));card.append(heading);
   const dl=el('dl',undefined,'ui-spec-meta');
   [['항목',item.item],['유형',item.type],['기본값',item.defaultValue],['필수여부',item.required],['기능상세',item.detail]].forEach(([key,value])=>dl.append(el('dt',key),el('dd',value)));
   card.append(dl);doc.append(card);
  });
  doc.append(el('h3','알림·확인·예외'));
  const list=el('ul');spec.messages.forEach(message=>list.append(el('li',message)));doc.append(list);
  const status=el('p',undefined,'task-spec-note');status.setAttribute('role','status');doc.append(status);
  const source=el('a','GitHub에서 전체 화면 명세 보기','ui-spec-source');source.href='https://github.com/with-demo/study/blob/main/jshwan/task-workspace/SCREEN-DESCRIPTIONS.md';source.target='_blank';source.rel='noopener noreferrer';doc.append(source);
  panel.replaceChildren(doc);panel.scrollTop=0;
 }
 pins();
}
function descriptionsTitle(id:string){return id+' : '+(descriptionFor(id)?.title||'현재 화면');}
function schedule(){if(!queued){queued=true;requestAnimationFrame(draw);}}
for(const event of ['annotation-render','annotation-sync','study-description-update'])window.addEventListener(event,schedule);
window.addEventListener('scroll',pins,true);window.addEventListener('resize',schedule);
new ResizeObserver(schedule).observe(document.getElementById('app')!);
const common=document.createElement('script');common.src='../../common/include/spec-panel.js';
common.onload=()=>{document.querySelector('.ui-spec-actions label')?.setAttribute('hidden','');document.querySelector('[data-spec="refresh"]')?.setAttribute('hidden','');schedule();};
document.body.append(common);
