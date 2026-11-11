(()=>{
const screens=['프로그램 목록·검색','프로그램 상세','로그인','예약 신청서','신청 완료','나의 예약 내역','예약 상세 및 취소','지도 탐색','캘린더 탐색','공지사항','자주묻는 질문','이용 후기 작성','공지사항 상세'].map((title,i)=>({id:`SH-LIB-${String(i+1).padStart(2,'0')}`,title,summary:title}));
window.GFAIR_SCREENS=[{name:'서울 독서행사',screens}];
const id=n=>screens[n-1].id;
const content=document.querySelector('#content'), dialog=document.querySelector('#reservation-dialog');
const types=['독서모임','독서·글쓰기','작가와의 만남','독립서점 북토크'];
const districts='종로 중구 용산 성동 광진 동대문 중랑 성북 강북 도봉 노원 은평 서대문 마포 양천 강서 구로 금천 영등포 동작 관악 서초 강남 송파 강동'.split(' ').map(x=>x==='중구'?x:x+'구');
const rows=[
 ['달빛 아래 읽는 소설',0,'마포구','합정 작은책방','함께 소설 한 편을 읽고 가장 오래 마음에 남은 문장을 나눠요.','◒','#dce8d6',7,18,12,[28,57]],
 ['문장으로 만나는 나',1,'은평구','은평 책뜰도서관','하루를 한 문장으로 남기는 짧은 글쓰기 워크숍입니다.','✎','#e9e2cd',10,16,8,[27,30]],
 ['한 권의 책이 되기까지',2,'종로구','종로 이야기공간','소설이 완성되기까지의 과정과 작가의 작업 일상을 들어봅니다.','✦','#eadbd0',14,24,24,[50,34]],
 ['토요일의 그림책',3,'성동구','성수 페이지책방','그림책의 이미지와 문장을 함께 읽고 감상을 이야기합니다.','▤','#dbe7e5',18,15,3,[68,52]],
 ['책과 함께 걷는 오후',0,'송파구','송파 책마당','산책을 주제로 한 에세이를 읽고 각자의 동네 이야기를 나눕니다.','◈','#e8dfeb',-3,20,12,[81,70]]
];
const programs=rows.map(([name,type,district,place,description,mark,tint,offset,capacity,filled,pos],i)=>({key:`book-${i+1}`,name,type:types[type],district,place,description,mark,tint,offset,capacity,filled,pos}));
const now=new Date();
const demoDateKey="shyu.reading.demo-date.v1";
let demoDate=new Date(localStorage.getItem(demoDateKey) || now);
if(Number.isNaN(demoDate.getTime())) demoDate=now;
try{localStorage.setItem(demoDateKey,demoDate.toISOString())}catch{}
function dateAt(offset,hour){const d=new Date(demoDate);d.setDate(d.getDate()+offset);d.setHours(hour,0,0,0);return d}
const dateLabel=d=>new Intl.DateTimeFormat('ko-KR',{month:'long',day:'numeric',weekday:'short'}).format(d);
const timeLabel=d=>`${dateLabel(d)} ${String(d.getHours()).padStart(2,'0')}:00`;
const dateKey=d=>[d.getFullYear(),d.getMonth()+1,d.getDate()].join('/');
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read=(store,key,fallback)=>{try{return JSON.parse(store.getItem(key))??fallback}catch{return fallback}};
const bookingsKey='shyu.reading.reservations.v1';
let bookings=read(localStorage,bookingsKey,[]);
if(!Array.isArray(bookings)) bookings=[];
let signedIn=read(sessionStorage,'shyu.reading.login',false);
let selected=programs.find(p=>p.key===sessionStorage.getItem("shyu.reading.program"))||programs[0];
let selectedBooking=bookings.find(b=>b.ref===sessionStorage.getItem("shyu.reading.booking"))||null, returnTo=2;
let filters={q:'',type:'',district:'',progress:'',status:''}, pinKey='', search='';
let month=new Date(now.getFullYear(),now.getMonth(),1), chosenDate=dateKey(now);
const link=(n,label,cls='button')=>`<a class="${cls}" href="#${id(n)}">${label}</a>`;
const go=n=>{if(location.hash===`#${id(n)}`)draw();else location.hash=id(n)};
const page=(tag,title,body)=>{
 const guide=tag==='GUIDE',my=tag==='MY PAGE'||tag==='MY RESERVATIONS';
 const menus=guide?[[10,'공지사항'],[11,'자주묻는 질문']]:my?[[6,'나의 예약내역'],[12,'이용 후기 작성']]:[];
 const tabs=menus.length?`<nav class="section-tabs" aria-label="${guide?'이용 안내':'마이페이지'} 하위 메뉴">${menus.map(([n,label])=>`<a href="#${id(n)}" ${location.hash.slice(1)===id(n)?'aria-current="page"':''}>${label}</a>`).join('')}</nav>`:'';
 return `<section class="frame page"><p class="eyebrow">${tag}</p><h1>${title}</h1>${tabs}${body}</section>`;
};
const empty=message=>`<p class="empty">${message}</p>`;
function state(p){
 const start=dateAt(p.offset,14),end=dateAt(p.offset,16);
 const opens=dateAt(p.offset===18?4:-10,9),closes=dateAt(p.offset-1,18);
 const count=p.filled+bookings.filter(b=>b.key===p.key&&!b.cancelled).length;
 const clock=new Date();
 const progress=clock<start?'진행 예정':clock<end?'진행 중':'종료';
 const reason=progress==='종료'?'행사 종료':clock<opens?'접수 시작 전':clock>=closes?'접수기간 종료':count>=p.capacity?'정원 마감':'';
 const status=reason==='접수 시작 전'?'접수 예정':reason?'접수 마감':'접수 중';
 return {start,end,opens,closes,count,progress,reason,status};
}
function match(p){
 const s=state(p);
 return p.name.toLowerCase().includes(filters.q.toLowerCase().trim())&&
 (!filters.type||p.type===filters.type)&&(!filters.district||p.district===filters.district)&&
 (!filters.progress||s.progress===filters.progress)&&(!filters.status||s.status===filters.status);
}
const option=(key,items)=>['',...items].map(x=>`<option value="${x}" ${filters[key]===x?'selected':''}>${x||'전체'}</option>`).join('');
function filterBar(){
 return `<form class="panel filters" id="reading-filters"><label class="field">프로그램명<input name="q" value="${escape(filters.q)}" placeholder="예: 소설, 그림책"></label>
 ${[['type','프로그램 유형',types],['district','서울 자치구',districts],['progress','진행 상태',['진행 예정','진행 중','종료']],['status','접수 상태',['접수 예정','접수 중','접수 마감']]].map(([key,label,items])=>`<label class="field">${label}<select name="${key}">${option(key,items)}</select></label>`).join('')}
 <div class="controls"><button class="button primary">검색</button><button class="button" type="button" data-action="reset">초기화</button></div></form>`;
}
function card(p){
 const s=state(p);
 return `<article class="card"><div class="card-art" style="--tint:${p.tint}" aria-hidden="true">${p.mark}</div><div class="card-content">
 <span class="chip ${s.status==='접수 중'?'open':'closed'}">${s.status}</span><span class="chip">${s.progress}</span>
 <h3><a href="#${id(2)}" data-program="${p.key}">${p.name}</a></h3><p>${dateLabel(s.start)} · ${p.district}</p><p class="muted">${p.type} · ${p.place}</p></div></article>`;
}
const cards=items=>items.length?`<div class="cards">${items.map(card).join('')}</div>`:empty('조건에 맞는 프로그램이 없습니다. 검색 조건을 변경해 보세요.');
const hero=`<div class="hero"><div class="frame hero-inner"><div><p class="eyebrow">SEOUL READING PROGRAMS</p><h1>서울에서 만나는<br>책과 이야기</h1><p>독서모임, 작가와의 만남, 동네서점 북토크를 한곳에서 찾아보세요.</p></div>
 <svg class="hero-art" viewBox="0 0 360 220" aria-hidden="true"><circle cx="184" cy="108" r="96" fill="#eef1de"/><path d="M45 186h270" stroke="#456e52" stroke-width="3" stroke-linecap="round"/><rect x="80" y="91" width="38" height="94" rx="5" fill="#bd6a43"/><rect x="123" y="66" width="38" height="119" rx="5" fill="#356449"/><rect x="167" y="78" width="30" height="107" rx="5" fill="#dca958"/><path d="M210 104l27-12 39 83-27 12z" fill="#6b8b72"/><path d="M92 107h14m29-24h14m30 13h7" stroke="#fff2d6" stroke-width="3" stroke-linecap="round"/><path d="M264 62v26m-13-13h26" stroke="#bd6a43" stroke-width="3" stroke-linecap="round"/></svg></div></div>`;
function explore(n){
 const items=programs.filter(match);
 const modes=[[1,'목록'],[8,'지도'],[9,'캘린더']].map(([i,name])=>`<a class="mode" href="#${id(i)}" ${n===i?'aria-current="page"':''}>${name}</a>`).join('');
 const body=`${filterBar()}<div class="result-heading"><h2>프로그램 <small>${items.length}건</small></h2><nav class="controls" aria-label="탐색 방식">${modes}</nav></div>${n===8?mapView(items):n===9?calendarView(items):cards(items)}`;
 return n===1?`${hero}<section class="frame section">${body}</section>`:page('PROGRAMS',n===8?'지도에서 찾기':'캘린더에서 찾기',body);
}
function mapView(items){
 if(!items.length)return empty('지도에 표시할 프로그램이 없습니다.');
 const active=items.find(p=>p.key===pinKey)||items[0];
 return `<div class="columns"><div class="panel"><div class="map-surface" aria-label="실습용 지도">
 <svg viewBox="0 0 500 350" preserveAspectRatio="none" aria-hidden="true"><rect width="500" height="350" fill="#e8eddf"/><path d="M0 220Q120 115 240 215T500 185" fill="none" stroke="#9dbfc7" stroke-width="35"/><path d="M0 80L500 115M0 280L500 305M80 0L100 350M190 0L250 350M350 0L405 350" fill="none" stroke="#fff" stroke-width="9"/></svg>
 ${items.map(p=>`<button type="button" class="pin" style="left:${p.pos[0]}%;top:${p.pos[1]}%" data-pin="${p.key}" aria-pressed="${p===active}">${p.district}</button>`).join('')}</div><p class="muted">실습용 지도 · 위치는 예시입니다.</p></div><div class="stack">${card(active)}<div class="panel"><h3>지도에 표시된 프로그램</h3>${items.map(p=>`<p><a href="#${id(2)}" data-program="${p.key}">${p.name}</a></p>`).join('')}</div></div></div>`;
}
function calendarView(items){
 const y=month.getFullYear(),m=month.getMonth(),days=new Date(y,m+1,0).getDate();
 const cells=Array.from({length:month.getDay()},()=>'<span></span>');
 for(let i=1;i<=days;i++){
  const k=dateKey(new Date(y,m,i)),count=items.filter(p=>dateKey(state(p).start)===k).length;
  cells.push(`<button type="button" class="day ${count?'has-event':''}" data-day="${k}" aria-label="${m+1}월 ${i}일, 행사 ${count}건" aria-pressed="${chosenDate===k}">${i}${count?`<small>${count}건</small>`:''}</button>`);
 }
 const dayItems=items.filter(p=>dateKey(state(p).start)===chosenDate);
 return `<div class="columns"><div class="panel"><div class="cal-head"><button class="button" data-month="-1" aria-label="이전 달">‹</button><h3>${y}년 ${m+1}월</h3><button class="button" data-month="1" aria-label="다음 달">›</button></div><div class="calendar">${'일 월 화 수 목 금 토'.split(' ').map(d=>`<strong>${d}</strong>`).join('')}${cells.join('')}</div></div><div class="stack"><h2>${chosenDate?chosenDate.replaceAll('/','.')+' 행사':'날짜별 프로그램'}</h2>${chosenDate?(dayItems.length?cards(dayItems):empty('선택한 날짜에 프로그램이 없습니다.')):empty('캘린더에서 날짜를 선택해 주세요.')}</div></div>`;
}
const details=items=>`<dl class="details">${items.map(([label,value])=>`<dt>${label}</dt><dd>${escape(value)}</dd>`).join('')}</dl>`;
const ownActive=p=>bookings.find(b=>b.key===p.key&&!b.cancelled);
function detail(){
 const p=selected,s=state(p), booking=signedIn&&ownActive(p);
 return page('PROGRAM DETAILS',p.name,`<a class="back" href="#${id(1)}">← 프로그램 목록</a><div class="columns"><div class="stack">
 <section class="panel"><div class="card-art" style="--tint:${p.tint}" aria-hidden="true">${p.mark}</div><h2>프로그램 소개</h2><p>${p.description}</p>${details([['유형',p.type],['대상','독서에 관심 있는 시민'],['운영 기관',p.place],['장소',`서울 ${p.district} · ${p.place}`],['이용 요금','무료']])}</section>
 <section class="panel"><h2>이용 후기</h2>${reviewBlock(p)}</section></div>
 <aside class="panel"><span class="chip ${s.reason?'closed':'open'}">${s.status}</span><span class="chip">${s.progress}</span><h2>신청 안내</h2>${details([['행사 일시',`${timeLabel(s.start)} ~ 16:00`],['접수 기간',`${timeLabel(s.opens)} ~ ${timeLabel(s.closes)}`],['접수 현황',`${s.count} / ${p.capacity}명`],['잔여 정원',`${Math.max(0,p.capacity-s.count)}명`]])}
 ${booking?`<a class="button primary" data-booking="${booking.ref}" href="#${id(7)}">내 예약 보기</a>`:`<button class="button primary" data-action="apply" ${s.reason?'disabled':''}>${s.reason||'예약 신청'}</button>`}
 ${s.reason?`<p class="muted">${s.reason}으로 신청할 수 없습니다.</p>`:''}</aside></div>`);
}
const login=()=>page('ACCOUNT','가상 로그인',`<form id="reading-login" class="panel form-panel"><p>실습용 계정으로 로그인한 뒤 프로그램으로 돌아갈 수 있어요.</p><button class="button primary">실습 계정으로 로그인</button></form>`);
function gated(message){return `<div class="panel"><p>${message}</p><button class="button primary" data-action="login">로그인</button></div>`}
function application(){
 if(!signedIn)return page('RESERVATION','예약 신청서',gated('예약을 신청하려면 가상 로그인이 필요합니다.'));
 const s=state(selected);
 if(ownActive(selected)||s.reason)return page('RESERVATION','예약 신청서',`<div class="panel"><p>${ownActive(selected)?'이미 신청한 프로그램입니다.':s.reason}</p>${link(2,'상세로 돌아가기')}</div>`);
 return page('RESERVATION','예약 신청서',`<form class="panel form-panel" id="reading-application" novalidate>
 <h2>${selected.name}</h2><p>${timeLabel(s.start)} · ${selected.place}</p><p class="muted">실제 개인정보 대신 실습용 정보를 입력해 주세요.</p>
 <label class="field">신청자 이름 (필수)<input name="name" maxlength="40" required aria-describedby="name-error" placeholder="예: 실습 참가자"></label><p class="error" id="name-error" role="alert"></p>
 <label class="field">휴대전화 (필수)<input name="phone" inputmode="numeric" maxlength="11" required pattern="010[0-9]{8}" aria-describedby="phone-error" placeholder="01000000000"></label><p class="error" id="phone-error" role="alert"></p>
 <label class="check"><input type="checkbox" name="agree" required aria-describedby="agree-error"> 실습용 입력값을 이 브라우저에 임시 저장하는 데 동의합니다. (필수)</label><p class="error" id="agree-error" role="alert"></p>
 <p class="error" id="submit-error" role="alert"></p><div class="controls">${link(2,'상세로 돌아가기')}<button class="button primary">제출 내용 확인</button></div></form>`);
}
const programFor=b=>programs.find(p=>p.key===b?.key);
function receipt(b){
 const p=programFor(b);
 return details([['접수번호',b.ref],['신청자',b.name],['프로그램',p.name],['일시',timeLabel(dateAt(p.offset,14))],['장소',p.place]]);
}
function completion(){
 if(!signedIn||!programFor(selectedBooking))return page('RESERVATION','신청 완료',`${empty('표시할 신청 결과가 없습니다.')}${link(6,'내 예약 보기')}`);
 return page('RESERVATION','예약 신청이 완료되었습니다',`<section class="panel">${receipt(selectedBooking)}<div class="controls">${link(6,'내 예약 보기','button primary')}${link(1,'프로그램 목록')}</div></section>`);
}
function myList(){
 if(!signedIn)return page('MY RESERVATIONS','나의 예약 내역',gated('가상 로그인 후 내 예약을 확인할 수 있습니다.'));
 return page('MY RESERVATIONS','나의 예약 내역',bookings.length?`<div class="stack">${[...bookings].reverse().map(b=>{const p=programFor(b);if(!p)return '';return `<article class="panel"><span class="chip ${b.cancelled?'closed':'open'}">${b.cancelled?'취소':'예약 완료'}</span><h2><a href="#${id(7)}" data-booking="${b.ref}">${p.name}</a></h2><p>신청일 ${dateLabel(new Date(b.created))} · 행사일 ${dateLabel(dateAt(p.offset,14))}</p>${reviewEligible(b)?link(12,reviewWritten(b)?'작성한 후기 보기':'이용 후기 작성'): ''}</article>`}).join('')}</div>`:`${empty('아직 예약한 프로그램이 없습니다.')}${link(1,'프로그램 찾기','button primary')}`);
}
const canCancel=b=>!b.cancelled&&new Date()<dateAt(programFor(b).offset,14);
function bookingDetail(){
 const b=selectedBooking;
 if(!signedIn||!programFor(b))return page('MY RESERVATIONS','예약 상세',`${empty('표시할 예약을 선택해 주세요.')}${link(6,'내 예약 보기')}`);
 return page('MY RESERVATIONS','예약 상세',`<div class="panel"><span class="chip ${b.cancelled?'closed':'open'}">${b.cancelled?'취소':'예약 완료'}</span>${receipt(b)}<p>행사 시작 전까지 취소할 수 있습니다. 접수 중이고 자리가 남아 있으면 다시 신청할 수 있습니다.</p><p id="cancel-error" class="error" role="alert"></p><div class="controls">${link(6,'내 예약 내역')}${b.cancelled?'':`<button class="button" data-action="cancel" ${canCancel(b)?'':'disabled'}>예약 취소</button>`}${reviewEligible(b)?link(12,reviewWritten(b)?'작성한 후기 보기':'이용 후기 작성'):''}</div></div>`);
}
function popup(key,title,message,action,label){
 dialog.dataset.screenId=key;
 dialog.innerHTML=`<div class="dialog-title"><h2 id="reservation-dialog-title">${title}</h2><button type="button" data-close aria-label="${title} 팝업 닫기">×</button></div><p>${message}</p><div class="controls"><button type="button" data-close autofocus>돌아가기</button><button type="button" class="primary" data-confirm>${label}</button></div>`;
 dialog.querySelectorAll('[data-close]').forEach(button=>button.onclick=()=>dialog.close());
 dialog.querySelector('[data-confirm]').onclick=()=>{dialog.close();action()};
 dialog.showModal();
}
function persist(next){try{localStorage.setItem(bookingsKey,JSON.stringify(next));bookings=next;return true}catch{return false}}
function apply(form){
 const fields=form.elements, name=fields.name.value.trim(), phone=fields.phone.value.trim();
 const errors={name:name?'':'신청자 이름을 입력해 주세요.',phone:/^010\d{8}$/.test(phone)?'':'010으로 시작하는 숫자 11자리를 입력해 주세요.',agree:fields.agree.checked?'':'임시 저장에 동의해 주세요.'};
 for(const [key,message] of Object.entries(errors)){
  document.getElementById(`${key}-error`).textContent=message;
  fields[key].setAttribute('aria-invalid',String(Boolean(message)));
 }
 const first=Object.keys(errors).find(key=>errors[key]);
 if(first){fields[first].focus();return}
 const p=selected;
 popup(`${id(4)}-p01`,'예약 신청 확인','입력한 정보로 예약을 신청할까요?',()=>{
  const error=document.querySelector('#submit-error');
  if(!signedIn||ownActive(p)||state(p).reason){error.textContent=state(p).reason||'이미 신청했거나 로그인이 필요합니다.';return}
  const created=Date.now(), b={key:p.key,name,ref:`SH-${created.toString(36).toUpperCase()}`,created,cancelled:false};
  if(!persist([...bookings,b])){error.textContent='예약을 임시 저장하지 못했습니다. 브라우저 설정을 확인해 주세요.';return}
  selectedBooking=b;sessionStorage.setItem("shyu.reading.booking",b.ref);go(5);
 },'신청 확정');
}

const notices = [
 {key:'notice-1',title:'독서 프로그램 예약 및 취소 이용 안내',date:'2026.11.11',important:true,body:'프로그램 상세 화면에서 대상, 행사일과 접수기간을 확인한 뒤 신청해 주세요. 예약 결과는 마이페이지의 나의 예약내역에서 확인할 수 있습니다.\n\n행사 시작 전까지 예약을 취소할 수 있습니다. 접수기간이 남아 있고 잔여 정원이 있으면 다시 신청할 수 있습니다. 이 안내는 목업의 실습용 정책입니다.'},
 {key:'notice-2',title:'이용 후기 작성 방법을 안내드립니다',date:'2026.11.10',important:false,body:'행사가 종료된 예약은 마이페이지 > 이용 후기 작성에서 선택할 수 있습니다. 취소한 예약은 작성 대상에서 제외됩니다.\n\n평점과 10자 이상의 후기를 입력해 주세요. 다른 이용자를 위한 프로그램 이용 경험을 남겨 주세요.'},
 {key:'notice-3',title:'프로그램 정보 및 가상 예약 이용 안내',date:'2026.11.09',important:false,body:'이 사이트는 기획 실습용 목업입니다. 표시된 프로그램과 기관 정보는 가상 예시이며, 예약과 후기는 이용 중인 브라우저에 임시 저장됩니다. 실제 개인정보 대신 실습용 정보를 사용해 주세요.'}
];
const questions = [
 ['예약','프로그램은 어떻게 예약하나요?','프로그램 목록, 지도 또는 캘린더에서 행사를 선택해 주세요. 상세에서 접수 상태와 잔여 정원을 확인하고 로그인 후 신청서를 제출하면 예약됩니다.'],
 ['예약','접수 중인데 신청할 수 없는 이유가 있나요?','상세 화면을 보는 동안 정원이 마감될 수 있습니다. 최종 제출할 때 접수기간, 잔여 정원, 중복 신청 여부를 다시 확인합니다.'],
 ['취소','예약은 언제까지 취소할 수 있나요?','목업에서는 행사 시작 전까지 취소할 수 있습니다. 마이페이지 > 나의 예약내역 > 예약 상세에서 취소할 수 있습니다.'],
 ['취소','취소한 프로그램에 다시 신청할 수 있나요?','접수기간이 남아 있고 잔여 정원이 있을 때 다시 신청할 수 있습니다.'],
 ['후기','이용 후기는 누가 작성할 수 있나요?','행사가 종료된 취소되지 않은 예약을 가진 사용자가 예약별 1회 작성할 수 있습니다. 실제 운영 시 참여 확인 정책은 별도 확정 예정입니다.'],
 ['이용','지도와 캘린더의 일정은 무엇을 기준으로 하나요?','지도에서는 예시 장소를, 캘린더에서는 실제 행사 개최일을 기준으로 프로그램을 찾습니다. 접수기간은 상세에서 별도로 확인해 주세요.']
];
let noticeQuery='', faqQuery='', faqCategory='', selectedNotice=notices.find(n=>n.key===sessionStorage.getItem('shyu.reading.notice'))||notices[0];
const reviewsKey='shyu.reading.reviews.v1';
let reviews=read(localStorage,reviewsKey,[]);
if(!Array.isArray(reviews)) reviews=[];
let reviewRef='', reviewSuccess=false;
const reviewEligible = b => programFor(b) && !b.cancelled && state(programFor(b)).progress==='종료';
const reviewWritten = b => reviews.some(r=>r.ref===b.ref);
function reviewBlock(p) {
 const saved=reviews.filter(r=>r.key===p.key);
 const sample=p.offset<0?[{rating:5,text:'함께 읽고 이야기하니 혼자 읽을 때 놓쳤던 문장이 보였어요. 다음 모임에도 참여하고 싶습니다.',created:dateAt(-1,14).getTime(),sample:true}]:[];
 const all=[...saved,...sample];
 return all.length?all.map(r=>`<article class="review"><div class="review-meta"><strong>평점 ${r.rating} / 5</strong><span>${r.sample?'예시 후기':'실습 회원'} · ${dateLabel(new Date(r.created))}</span></div><p>${escape(r.text)}</p></article>`).join(''):empty('등록된 이용 후기가 없습니다.');
}
function noticeList(){
 const items=notices.filter(n=>n.title.includes(noticeQuery));
 return page('GUIDE','공지사항',`<p class="page-intro">프로그램 예약과 서비스 이용에 필요한 소식을 안내합니다.</p><form id="notice-search" class="board-search"><label for="notice-keyword">제목 검색</label><input id="notice-keyword" name="q" value="${escape(noticeQuery)}" placeholder="검색어를 입력하세요"><button class="button primary">검색</button></form><div class="list-summary">전체 <strong>${items.length}</strong>건</div><div class="table-scroll"><table class="board-table"><thead><tr><th scope="col">번호</th><th scope="col">제목</th><th scope="col">등록일</th></tr></thead><tbody>${items.map((n,i)=>`<tr><td>${n.important?'<span class="chip open">공지</span>':items.length-i}</td><td><a href="#${id(13)}" data-notice="${n.key}">${n.title}</a></td><td>${n.date}</td></tr>`).join('')||'<tr><td colspan="3">검색 결과가 없습니다.</td></tr>'}</tbody></table></div>`);
}
function noticeDetail(){
 const n=selectedNotice;
 return page('GUIDE','공지사항',`<article class="notice-article"><h2>${n.title}</h2><div class="article-meta">등록일 ${n.date} · 운영 안내</div><div class="article-body">${escape(n.body).replaceAll('\n','<br>')}</div></article><div class="bottom-actions">${link(10,'목록으로')}</div>`);
}
function faq(){
 const items=questions.filter(([category,q,a])=>(!faqCategory||category===faqCategory)&&(q+a).includes(faqQuery));
 return page('GUIDE','자주묻는 질문',`<p class="page-intro">예약과 이용에 대해 궁금한 점을 확인해 보세요.</p><form id="faq-search" class="board-search"><label for="faq-category">분류</label><select id="faq-category" name="category">${['','예약','취소','후기','이용'].map(c=>`<option value="${c}" ${faqCategory===c?'selected':''}>${c||'전체'}</option>`).join('')}</select><label class="sr-only" for="faq-keyword">질문 검색</label><input id="faq-keyword" name="q" value="${escape(faqQuery)}" placeholder="궁금한 내용을 입력하세요"><button class="button primary">검색</button></form><div class="faq-list">${items.map(([c,q,a])=>`<details class="faq-item"><summary><span class="question-mark">Q</span><span class="faq-category">${c}</span><span>${q}</span></summary><div class="faq-answer">${a}</div></details>`).join('')||empty('검색 결과가 없습니다.')}</div>`);
}
function reviewPage(){
 if(!signedIn)return page('MY PAGE','이용 후기 작성',gated('로그인 후 예약한 프로그램의 후기를 작성할 수 있습니다.'));
 const eligible=bookings.filter(reviewEligible), writable=eligible.filter(b=>!reviewWritten(b));
 const chosen=writable.find(b=>b.ref===reviewRef)||writable[0];
 const list=reviews.map(r=>`<article class="review"><h3>${programs.find(p=>p.key===r.key)?.name||'프로그램'}</h3><div class="review-meta">평점 ${r.rating} / 5 · ${dateLabel(new Date(r.created))}</div><p>${escape(r.text)}</p></article>`).join('');
 const form=chosen?`<form id="reading-review" class="panel review-form" novalidate><h2>후기 작성</h2><label class="field">프로그램 선택<select name="reservation">${writable.map(b=>`<option value="${b.ref}" ${b===chosen?'selected':''}>${programFor(b).name} · ${dateLabel(state(programFor(b)).start)}</option>`).join('')}</select></label><label class="field">평점 (필수)<select name="rating"><option value="">평점을 선택하세요</option>${[5,4,3,2,1].map(v=>`<option value="${v}">${v}점</option>`).join('')}</select></label><label class="field">이용 후기 (필수)<textarea name="body" rows="7" maxlength="1000" aria-describedby="review-help review-error" placeholder="프로그램 이용 경험을 10자 이상 남겨 주세요."></textarea></label><p id="review-help" class="muted">앞뒤 공백을 제외하고 10~1,000자. 개인정보는 입력하지 마세요.</p><p class="error" id="review-error" role="alert"></p><div class="bottom-actions"><button class="button primary">후기 등록</button></div></form>`:empty(eligible.length?'작성 가능한 후기를 모두 등록했습니다.':'행사가 종료된 예약이 있을 때 후기를 작성할 수 있습니다.');
 return page('MY PAGE','이용 후기 작성',`<div class="info-box">예약한 행사가 종료된 후 작성할 수 있습니다. 취소한 예약은 작성 대상에서 제외됩니다.</div>${reviewSuccess?'<p class="success-message" role="status">후기가 등록되었습니다. 프로그램 상세에서도 확인할 수 있습니다.</p>':''}${form}<section class="my-reviews"><h2>내가 작성한 후기 <small>${reviews.length}건</small></h2>${list||empty('아직 작성한 후기가 없습니다.')}</section>`);
}
function saveReview(form){
 const rating=Number(form.elements.rating.value),text=form.elements.body.value.trim();
 const ref=form.elements.reservation.value,b=bookings.find(b=>b.ref===ref);
 const error=document.getElementById('review-error');
 if(!b||!reviewEligible(b)||reviewWritten(b)){error.textContent='후기를 작성할 수 있는 예약을 선택해 주세요.';return;}
 if(!Number.isInteger(rating)||rating<1||rating>5){error.textContent='평점을 선택해 주세요.';form.elements.rating.focus();return;}
 if(text.length<10||text.length>1000){error.textContent='후기를 10~1,000자로 입력해 주세요.';form.elements.body.focus();return;}
 popup(`${id(12)}-p01`,'후기 등록 확인','작성한 이용 후기를 등록할까요?',()=>{
  if(!signedIn||!reviewEligible(b)||reviewWritten(b)){error.textContent='작성 대상과 등록 여부를 다시 확인해 주세요.';return;}
  const next=[{ref,key:b.key,rating,text,created:Date.now()},...reviews];
  try{localStorage.setItem(reviewsKey,JSON.stringify(next));reviews=next;reviewSuccess=true;draw();content.focus();}
  catch{error.textContent='후기를 저장하지 못했습니다. 입력 내용을 유지합니다.';}
 },'등록');
}

const specs=[
 ['apply-confirm',4,'예약 신청 확인','레이어 컨펌','필수 입력값이 유효한 상태에서 제출 내용 확인 선택','입력한 정보로 예약을 신청할까요?','접수 조건을 재확인하고 저장 성공 시 신청 완료 화면으로 이동','신청서 입력을 유지합니다.'],
 ['cancel-confirm',7,'예약 취소 확인','레이어 컨펌','행사 시작 전 예약 취소 선택','이 예약을 취소할까요?','취소를 저장하고 예약 상세 및 목록에 상태를 반영','현재 예약 상태를 유지합니다.'],
 ['phone-format',4,'휴대전화 형식','인라인 오류','휴대전화가 010으로 시작하는 숫자 11자리가 아닐 때','010으로 시작하는 숫자 11자리를 입력해 주세요.','신청서에 머물며 오류 항목으로 이동','']
];
specs.push(['review-confirm',12,'후기 등록 확인','레이어 컨펌','평점과 후기 검증을 통과한 뒤 등록 선택','작성한 이용 후기를 등록할까요?','저장 후 작성 결과 표시','입력 내용 유지']);
window.GFAIR_MESSAGE_SPECS=specs.map(([key,n,title,type,trigger,message,confirm,cancel])=>({key,screens:[id(n)],title,type,trigger,message,confirm,cancel}));
function draw(){
 const hash=location.hash.slice(1), index=screens.findIndex(s=>s.id===hash);
 const n=index<0?1:index+1;
 document.querySelector('#account-link').textContent=signedIn?'로그아웃':'로그인';
 document.querySelectorAll('[data-nav]').forEach(a=>a.setAttribute('aria-current',a.dataset.nav===(n===6||n===7||n===12?'my':n===10||n===11||n===13?'guide':'program')?'page':'false'));
 document.title=`${hash==='screens'?'화면검색':screens[n-1].title} · 서울 독서행사`;
 if(hash==='screens'){
  const items=screens.filter(s=>`${s.id} ${s.title}`.toLowerCase().includes(search.toLowerCase()));
  content.innerHTML=page('SCREEN INDEX','화면검색',`<form id="reading-screen-search" class="controls"><label>화면 ID 또는 이름 <input name="q" value="${escape(search)}"></label><button class="button">검색</button></form><ul>${items.map(s=>`<li><a href="#${s.id}">${s.id} · ${s.title}</a></li>`).join('')}</ul>${items.length?'':empty('검색 결과가 없습니다.')}`);
  return;
 }
 content.innerHTML=[()=>explore(1),detail,login,application,completion,myList,bookingDetail,()=>explore(8),()=>explore(9),noticeList,faq,reviewPage,noticeDetail][n-1]();
}
content.addEventListener('submit',event=>{
 const form=event.target;event.preventDefault();
 if(form.id==='reading-filters'){filters=Object.fromEntries(new FormData(form));pinKey='';draw();document.querySelector('#reading-filters button').focus()}
 if(form.id==='reading-screen-search'){search=form.elements.q.value.trim();draw();document.querySelector('#reading-screen-search input').focus()}
 if(form.id==='reading-login'){signedIn=true;sessionStorage.setItem('shyu.reading.login','true');go(returnTo)}
 if(form.id==='reading-application')apply(form);
 if(form.id==='notice-search'){noticeQuery=form.elements.q.value.trim();draw();content.querySelector('#notice-keyword').focus();}
 if(form.id==='faq-search'){faqQuery=form.elements.q.value.trim();faqCategory=form.elements.category.value;draw();content.querySelector('#faq-keyword').focus();}
 if(form.id==='reading-review')saveReview(form);
});
document.querySelector('#account-link').addEventListener('click',event=>{
 if(signedIn){event.preventDefault();signedIn=false;selectedBooking=null;sessionStorage.removeItem('shyu.reading.login');go(1)}
 else returnTo=1;
});
document.querySelector('.site-header').addEventListener('click',event=>{
 if(event.target.closest('a')) document.querySelectorAll('.nav-group[open]').forEach(menu=>{menu.open=false;});
});
content.addEventListener('click',event=>{
 const control=event.target.closest('button,a');if(!control)return;
 const {program,booking,action,pin,day,month:monthStep,notice,status}=control.dataset;
 if(notice){selectedNotice=notices.find(n=>n.key===notice)||notices[0];sessionStorage.setItem('shyu.reading.notice',selectedNotice.key);if(location.hash===`#${id(13)}`)draw();}
 if(status!==undefined){filters.status=status;draw();content.querySelector(`[data-status="${status}"]`)?.focus();}
 if(program){selected=programs.find(p=>p.key===program);sessionStorage.setItem("shyu.reading.program",program);if(location.hash===`#${id(2)}`)draw()}
 if(booking){selectedBooking=bookings.find(b=>b.ref===booking);sessionStorage.setItem("shyu.reading.booking",booking);if(location.hash===`#${id(7)}`)draw()}
 if(pin){pinKey=pin;draw();content.querySelector(`[data-pin="${pin}"]`)?.focus()}
 if(day){chosenDate=day;draw();content.querySelector(`[data-day="${day}"]`)?.focus()}
 if(monthStep){month=new Date(month.getFullYear(),month.getMonth()+Number(monthStep),1);chosenDate='';draw();content.querySelector(`[data-month="${monthStep}"]`)?.focus()}
 if(action==='reset'){filters={q:'',type:'',district:'',progress:'',status:''};pinKey='';draw();content.querySelector('[data-action=reset]').focus()}
 if(action==='apply'){returnTo=2;go(signedIn?4:3)}
 if(action==='login'){returnTo=location.hash===`#${id(12)}`?12:location.hash===`#${id(4)}`?4:6;go(3)}
 if(action==='cancel'&&canCancel(selectedBooking)){
  const target=selectedBooking;
  popup(`${id(7)}-p01`,'예약 취소 확인','이 예약을 취소할까요?',()=>{
   if(!canCancel(target)){document.querySelector('#cancel-error').textContent='취소 가능 시간이 지났습니다.';return}
   const cancelled={...target,cancelled:true};
   if(!persist(bookings.map(b=>b.ref===target.ref?cancelled:b))){document.querySelector('#cancel-error').textContent='취소를 저장하지 못했습니다.';return}
   selectedBooking=cancelled;draw();content.focus();
  },'예약 취소');
 }
});
window.addEventListener('hashchange',()=>{if(dialog.open)dialog.close();draw();content.focus();window.scrollTo(0,0)});
draw();
})();
