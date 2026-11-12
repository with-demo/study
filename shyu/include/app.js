(()=>{
const {screenDefs,types,districts,rows,notices,questions,programImages,spaceImages,mapPositions}=window.SHYU_DATA;

const screens=screenDefs.map(([id,title])=>({id,title,summary:title}));
window.GFAIR_SCREENS=[{name:'서울 독서행사',screens}];
const id=n=>screens[n-1].id;
const content=document.querySelector('#content'), dialog=document.querySelector('#reservation-dialog');



const programs=rows.map(([name,type,district,place,description,mark,tint,offset,capacity,filled,pos],i)=>({key:`book-${i+1}`,name,type:types[type],district,place,description,mark,tint,offset,capacity,filled,pos,image:programImages[i],spaceImage:spaceImages[i],mapPosition:mapPositions[i]}));
const now=new Date();
const demoDateKey="shyu.reading.demo-date.v1";
let demoDate=new Date(localStorage.getItem(demoDateKey) || now);
if(Number.isNaN(demoDate.getTime())) demoDate=now;
try{localStorage.setItem(demoDateKey,demoDate.toISOString())}catch{}
function dateAt(offset,hour){const d=new Date(demoDate);d.setDate(d.getDate()+offset);d.setHours(hour,0,0,0);return d}
const dateLabel=d=>new Intl.DateTimeFormat('ko-KR',{month:'long',day:'numeric',weekday:'short'}).format(d);
const timeLabel=d=>`${dateLabel(d)} ${String(d.getHours()).padStart(2,'0')}:00`;
const dateKey=d=>[d.getFullYear(),d.getMonth()+1,d.getDate()].join('/');
const localDate=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read=(store,key,fallback)=>{try{return JSON.parse(store.getItem(key))??fallback}catch{return fallback}};
const bookingsKey='shyu.reading.reservations.v1';
let bookings=read(localStorage,bookingsKey,[]);
if(!Array.isArray(bookings)) bookings=[];
let signedIn=read(sessionStorage,'shyu.reading.login',false);
let selected=programs.find(p=>p.key===sessionStorage.getItem("shyu.reading.program"))||programs[0];
let selectedBooking=bookings.find(b=>b.ref===sessionStorage.getItem("shyu.reading.booking"))||null, returnTo=2;
let filters={q:'',type:'',district:'',progress:'',status:'',date:'',sort:'event'}, pinKey='', search='', programPage=1;
let month=new Date(now.getFullYear(),now.getMonth(),1), chosenDate=dateKey(now);
const link=(n,label,cls='button')=>`<a class="${cls}" href="#${id(n)}">${label}</a>`;
const go=n=>{if(location.hash===`#${id(n)}`)draw();else location.hash=id(n)};
const page=(tag,title,body)=>{
 const guide=tag==='GUIDE',my=tag==='MY PAGE'||tag==='MY RESERVATIONS';
 const menus=guide?[[10,'공지사항'],[11,'자주 묻는 질문']]:my?[[6,'나의 예약 내역'],[12,'후기 작성'],[23,'나의 후기'],[25,'내 정보']]:tag==='ABOUT'||tag==='HOW TO USE'?[[15,'서비스 안내'],[16,'이용 방법']]:[];
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
 (!filters.progress||s.progress===filters.progress)&&(!filters.status||s.status===filters.status)&&(!filters.date||localDate(s.start)===filters.date);
}
const option=(key,items)=>['',...items].map(x=>`<option value="${x}" ${filters[key]===x?'selected':''}>${x||'전체'}</option>`).join('');
function filterBar(){
 return `<form class="panel filters" id="reading-filters"><label class="field">프로그램명<input name="q" value="${escape(filters.q)}" placeholder="예: 소설, 그림책"></label>
 ${[['type','프로그램 유형',types],['district','서울 자치구',districts],['progress','진행 상태',['진행 예정','진행 중','종료']],['status','접수 상태',['접수 예정','접수 중','접수 마감']]].map(([key,label,items])=>`<label class="field">${label}<select name="${key}">${option(key,items)}</select></label>`).join('')}
 <label class="field">행사일<input type="date" name="date" value="${filters.date||''}"></label><label class="field">정렬<select name="sort"><option value="event" ${filters.sort==='event'?'selected':''}>행사일 빠른순</option><option value="deadline" ${filters.sort==='deadline'?'selected':''}>접수 마감일순</option></select></label><div class="controls"><button class="button primary">검색</button><button class="button" type="button" data-action="reset">초기화</button></div></form>`;
}
function photo(p,cls='card-art'){const image=cls.includes('space-art')?p.spaceImage:p.image;return `<div class="${cls} photo-art"><img src="assets/images/${image.file}" alt="${image.alt}（분위기 예시 사진）" style="object-position:${image.position}" loading="lazy" decoding="async"><span class="photo-caption">분위기 예시</span></div>`}
function card(p){
 const s=state(p);
 return `<article class="card">${photo(p)}<div class="card-content">
 <span class="chip ${s.status==='접수 중'?'open':'closed'}">${s.status}</span><span class="chip">${s.progress}</span>
 <h3><a href="#${id(2)}" data-program="${p.key}">${p.name}</a></h3><p class="card-description">${p.description}</p><p>${timeLabel(s.start)} · ${p.district}</p><p class="muted">${p.type} · ${p.place}</p><p class="card-capacity">무료 · 잔여 ${Math.max(0,p.capacity-s.count)}명 <span>접수 ~ ${dateLabel(s.closes)}</span></p></div></article>`;
}
const cards=items=>items.length?`<div class="cards">${items.map(card).join('')}</div>`:empty('조건에 맞는 프로그램이 없습니다. 검색 조건을 변경해 보세요.');
const hero=`<div class="hero"><div class="frame hero-inner"><div><p class="eyebrow">SEOUL READING PROGRAMS</p><h1>서울에서 만나는<br>책과 이야기</h1><p>독서모임, 작가와의 만남, 동네서점 북토크를 한곳에서 찾아보세요.</p></div>
 <svg class="hero-art" viewBox="0 0 360 220" aria-hidden="true"><circle cx="184" cy="108" r="96" fill="#eef1de"/><path d="M45 186h270" stroke="#456e52" stroke-width="3" stroke-linecap="round"/><rect x="80" y="91" width="38" height="94" rx="5" fill="#bd6a43"/><rect x="123" y="66" width="38" height="119" rx="5" fill="#356449"/><rect x="167" y="78" width="30" height="107" rx="5" fill="#dca958"/><path d="M210 104l27-12 39 83-27 12z" fill="#6b8b72"/><path d="M92 107h14m29-24h14m30 13h7" stroke="#fff2d6" stroke-width="3" stroke-linecap="round"/><path d="M264 62v26m-13-13h26" stroke="#bd6a43" stroke-width="3" stroke-linecap="round"/></svg></div></div>`;
function explore(n){
 const items=programs.filter(match).sort((a,b)=>state(a)[filters.sort==='deadline'?'closes':'start']-state(b)[filters.sort==='deadline'?'closes':'start']);
 const modes=[[1,'목록'],[8,'지도'],[9,'캘린더']].map(([i,name])=>`<a class="mode" href="#${id(i)}" ${n===i?'aria-current="page"':''}>${name}</a>`).join('');
 const body=`${filterBar()}<div class="result-heading"><h2>프로그램 <small>${items.length}건</small></h2><nav class="controls" aria-label="탐색 방식">${modes}</nav></div>${n===9?calendarView(items):cards(items.slice((programPage-1)*PAGE_SIZE,programPage*PAGE_SIZE))+pagination(items.length,programPage,'program')}`;
 return page('PROGRAMS',n===9?'독서 캘린더':'독서 프로그램',body);
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
 <section class="panel">${photo(p)}<h2>프로그램 소개</h2><p>${p.description}</p>${details([['유형',p.type],['대상','독서에 관심 있는 시민'],['운영 기관',p.place],['장소',`서울 ${p.district} · ${p.place}`],['이용 요금','무료']])}</section>
 <section class="panel"><div class="controls"><a class="button" data-space="${p.key}" href="#${id(18)}">공간 정보 보기</a>${link(19,'참여 이야기')}</div><h2>이용 후기</h2>${reviewBlock(p)}</section></div>
 <aside class="panel"><span class="chip ${s.reason?'closed':'open'}">${s.status}</span><span class="chip">${s.progress}</span><h2>신청 안내</h2>${details([['행사 일시',`${timeLabel(s.start)} ~ 16:00`],['접수 기간',`${timeLabel(s.opens)} ~ ${timeLabel(s.closes)}`],['접수 현황',`${s.count} / ${p.capacity}명`],['잔여 정원',`${Math.max(0,p.capacity-s.count)}명`]])}
 ${booking?`<a class="button primary" data-booking="${booking.ref}" href="#${id(7)}">내 예약 보기</a>`:`<button class="button primary" data-action="apply" ${s.reason?'disabled':''}>${s.reason||'예약 신청'}</button>`}
 ${s.reason?`<p class="muted">${s.reason}으로 신청할 수 없습니다.</p>`:''}</aside></div>`);
}
const login=()=>page('ACCOUNT','로그인',signedIn?`<div class="panel"><p>실습 회원으로 로그인되어 있습니다.</p>${link(6,'나의 예약 확인')}${link(28,'로그아웃')}</div>`:`<div class="account-layout"><form id="reading-login" class="panel form-panel" novalidate><h2>다시 만나 반가워요</h2><p>책과 함께하는 다음 일정을 준비해 보세요.</p><label class="field">아이디<input name="account" autocomplete="off" placeholder="실습 아이디를 입력하세요" required></label><label class="field">비밀번호<input name="password" type="password" autocomplete="off" placeholder="실제 비밀번호는 입력하지 마세요" required></label><p class="error" id="login-error" role="alert"></p><button class="button primary">로그인</button><div class="account-links">${link(21,'회원가입','text-link')}${link(22,'아이디·비밀번호 찾기','text-link')}</div><p class="muted">입력 검증을 연습하는 가상 로그인입니다. 입력값은 저장하지 않습니다.</p></form><aside class="panel"><h2>화면을 먼저 둘러보세요</h2><p>실제 계정 없이 예약과 후기 흐름을 확인할 수 있습니다.</p><button class="button" data-action="demo-login">실습 회원으로 바로 시작</button><p class="muted">예시 예약 2건이 제공됩니다. 실제 신청은 이루어지지 않습니다.</p></aside></div>`);
function gated(message){return `<div class="panel"><p>${message}</p><button class="button primary" data-action="login">로그인</button></div>`}
function application(){
 if(!signedIn)return page('RESERVATION','예약 신청서',`${applicationPreview()}${gated('아래와 같은 신청서를 작성합니다. 계속하려면 실습 로그인이 필요합니다.')}`);
 const s=state(selected);
 if(ownActive(selected)||s.reason)return page('RESERVATION','예약 신청서',`<div class="panel"><p>${ownActive(selected)?'이미 신청한 프로그램입니다.':s.reason}</p>${link(2,'상세로 돌아가기')}</div>`);
 return page('RESERVATION','예약 신청서',`<form class="panel form-panel" id="reading-application" novalidate>
 <h2>${selected.name}</h2><p>${timeLabel(s.start)} · ${selected.place}</p><p class="muted">실제 개인정보 대신 실습용 정보를 입력해 주세요.</p>
 <label class="field">신청자 이름 (필수)<input name="name" maxlength="40" required aria-describedby="name-error" placeholder="예: 실습 참가자"></label><p class="error" id="name-error" role="alert"></p>
 <label class="field">휴대전화 (필수)<input name="phone" inputmode="numeric" maxlength="11" required pattern="010[0-9]{8}" aria-describedby="phone-error" placeholder="01000000000"></label><p class="error" id="phone-error" role="alert"></p>
 <label class="field">이메일 (필수)<input name="email" type="email" maxlength="100" required aria-describedby="email-error" placeholder="reader@example.test"></label><p class="error" id="email-error" role="alert"></p>
 <label class="check"><input type="checkbox" name="agree" required aria-describedby="agree-error"> 실습용 입력값을 이 브라우저에 임시 저장하는 데 동의합니다. (필수)</label><p class="error" id="agree-error" role="alert"></p>
 <p class="error" id="submit-error" role="alert"></p><div class="controls">${link(2,'상세로 돌아가기')}<button class="button primary">제출 내용 확인</button></div></form>`);
}
const programFor=b=>programs.find(p=>p.key===b?.key);
function receipt(b){
 const p=programFor(b);
 return details([['접수번호',b.ref],['신청자',b.name],['프로그램',p.name],['일시',timeLabel(dateAt(p.offset,14))],['장소',p.place],['이메일',b.email||'미입력'],['예약 상태',b.cancelled?'취소':'예약 완료'],...(b.cancelledAt?[['취소일',dateLabel(new Date(b.cancelledAt))]]:[])]);
}
function completion(){
 if(!signedIn||!programFor(selectedBooking))return page('RESERVATION','신청 완료 화면 미리보기',`<div class="info-box">예시 화면입니다. 실제 신청된 내역이 아닙니다.</div>${completionBody(exampleBooking())}`);
 return page('RESERVATION','예약 신청이 완료되었습니다',completionBody(selectedBooking));
}
function myList(){
 if(!signedIn)return page('MY RESERVATIONS','나의 예약 내역',gated('가상 로그인 후 내 예약을 확인할 수 있습니다.'));
 const items=bookings.filter(b=>programFor(b)&&(!myStatus||(myStatus==='cancelled'?b.cancelled:!b.cancelled))&&(!myFrom||localDate(state(programFor(b)).start)>=myFrom)&&(!myTo||localDate(state(programFor(b)).start)<=myTo));
 return page('MY RESERVATIONS','나의 예약 내역',`<form id="my-filter" class="panel controls"><label class="field">행사 시작일<input type="date" name="from" value="${myFrom}"></label><label class="field">행사 종료일<input type="date" name="to" value="${myTo}"></label><label class="field">예약 상태<select name="status"><option value="">전체</option><option value="active" ${myStatus==='active'?'selected':''}>예약 완료</option><option value="cancelled" ${myStatus==='cancelled'?'selected':''}>취소</option></select></label><button class="button primary">조회</button><button class="button" type="button" data-action="my-reset">초기화</button></form><p class="list-summary">전체 ${items.length}건 · 실습 예약</p>${items.length?`<div class="stack">${[...items].reverse().map(b=>{const p=programFor(b);return `<article class="panel"><span class="chip ${b.cancelled?'closed':'open'}">${b.cancelled?'취소':'예약 완료'}</span><h2><a href="#${id(7)}" data-booking="${b.ref}">${p.name}</a></h2><p>예약번호 ${b.ref}</p><p>신청일 ${dateLabel(new Date(b.created))} · 행사일 ${timeLabel(dateAt(p.offset,14))}</p>${reviewEligible(b)?`<a class="button" href="#${id(reviewWritten(b)?23:12)}" data-review-booking="${b.ref}">${reviewWritten(b)?'작성한 후기 보기':'이용 후기 작성'}</a>`:''}</article>`}).join('')}</div>`:`${empty('조건에 맞는 예약이 없습니다.')}${link(1,'프로그램 찾기','button primary')}`}`);
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
 const fields=form.elements, name=fields.name.value.trim(), phone=fields.phone.value.trim(),email=fields.email.value.trim();
 const errors={name:name?'':'신청자 이름을 입력해 주세요.',phone:/^010\d{8}$/.test(phone)?'':'010으로 시작하는 숫자 11자리를 입력해 주세요.',email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?'':'이메일 형식을 확인해 주세요.',agree:fields.agree.checked?'':'임시 저장에 동의해 주세요.'};
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
  const created=Date.now(), b={key:p.key,name,email,ref:`SH-${created.toString(36).toUpperCase()}`,created,cancelled:false};
  if(!persist([...bookings,b])){error.textContent='예약을 임시 저장하지 못했습니다. 브라우저 설정을 확인해 주세요.';return}
  selectedBooking=b;sessionStorage.setItem("shyu.reading.booking",b.ref);editDirty=false;go(5);
 },'신청 확정');
}



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
 const items=notices.filter(n=>n.title.includes(noticeQuery)).sort((a,b)=>Number(b.important)-Number(a.important)||b.date.localeCompare(a.date));
 const visible=items.slice((noticePage-1)*2,noticePage*2);
 return page('GUIDE','공지사항',`<p class="page-intro">프로그램 예약과 서비스 이용에 필요한 소식을 안내합니다.</p><form id="notice-search" class="board-search"><label for="notice-keyword">제목 검색</label><input id="notice-keyword" name="q" value="${escape(noticeQuery)}" placeholder="검색어를 입력하세요"><button class="button primary">검색</button></form><div class="list-summary">전체 <strong>${items.length}</strong>건</div><div class="table-scroll"><table class="board-table"><thead><tr><th scope="col">번호</th><th scope="col">제목</th><th scope="col">등록일</th></tr></thead><tbody>${visible.map((n,i)=>`<tr><td>${n.important?'<span class="chip open">공지</span>':items.length-(noticePage-1)*2-i}</td><td><a href="#${id(13)}" data-notice="${n.key}">${n.title}</a></td><td>${n.date}</td></tr>`).join('')||'<tr><td colspan="3">검색 결과가 없습니다.</td></tr>'}</tbody></table></div>${items.length>2?`<nav class="pagination" aria-label="공지사항 페이지">${Array.from({length:Math.ceil(items.length/2)},(_,i)=>`<button class="button ${noticePage===i+1?'primary':''}" data-notice-page="${i+1}">${i+1}</button>`).join('')}</nav>`:''}`);
}
function noticeDetail(){
 const n=selectedNotice,index=notices.indexOf(n);
 return page('GUIDE','공지사항',`<article class="notice-article"><h2>${n.title}</h2><div class="article-meta">등록일 ${n.date} · 운영 안내</div><div class="article-body">${escape(n.body).replaceAll('\n','<br>')}</div></article><div class="bottom-actions">${index>0?`<a class="button" data-notice="${notices[index-1].key}" href="#${id(13)}">이전 글</a>`:''}${link(10,'목록으로')}${index<notices.length-1?`<a class="button" data-notice="${notices[index+1].key}" href="#${id(13)}">다음 글</a>`:''}</div>`);
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
 const error=document.getElementById('review-error'),title=form.elements.title?.value.trim();
 if(!title){error.textContent='후기 제목을 입력해 주세요.';form.elements.title.focus();return;}
 if(!b||!reviewEligible(b)||reviewWritten(b)){error.textContent='후기를 작성할 수 있는 예약을 선택해 주세요.';return;}
 if(!Number.isInteger(rating)||rating<1||rating>5){error.textContent='평점을 선택해 주세요.';form.elements.rating.focus();return;}
 if(text.length<10||text.length>1000){error.textContent='후기를 10~1,000자로 입력해 주세요.';form.elements.body.focus();return;}
 popup(`${id(12)}-p01`,'후기 등록 확인','작성한 이용 후기를 등록할까요?',()=>{
  if(!signedIn||!reviewEligible(b)||reviewWritten(b)){error.textContent='작성 대상과 등록 여부를 다시 확인해 주세요.';return;}
  const next=[{ref,key:b.key,title,rating,text,created:Date.now()},...reviews];
  try{localStorage.setItem(reviewsKey,JSON.stringify(next));reviews=next;selectedReview=ref;reviewSuccess=true;editDirty=false;go(20);content.focus();}
  catch{error.textContent='후기를 저장하지 못했습니다. 입력 내용을 유지합니다.';}
 },'등록');
}

// 사이트맵 보완 화면. 계정과 예약은 실제 서버 인증이 아닌 동일 브라우저의 실습 데이터이다.
let profile=read(localStorage,'shyu.reading.profile',{name:'실습 회원',email:'reader@example.test',phone:'01000000000'});
let spaceFilters={q:'',district:'',type:''}, selectedSpace=selected.key, selectedReview='', reviewQuery='',reviewType='',myStatus='',myFrom='',myTo='';
let noticePage=1, reviewPageNumber=1, editDirty=false;
const PAGE_SIZE=3;
const sampleReview={ref:'sample-review',key:programs[4].key,title:'책을 따라 동네를 새롭게 만났어요',text:'혼자 읽을 때는 지나쳤던 문장을 다른 분들과 함께 이야기하며 다시 발견했습니다. 산책과 독서를 함께 할 수 있어 좋았어요.',rating:5,created:dateAt(-1,14).getTime(),sample:true};
const allReviews=()=>[...reviews,sampleReview].sort((a,b)=>b.created-a.created);
const placeType=p=>p.type==='독립서점 북토크'||p.key==='book-1'?'독립서점':'도서관·문화공간';
const address=p=>`서울특별시 ${p.district} 책길 ${Number(p.key.slice(-1))*12} (예시 주소)`;
const selectedPlace=()=>programs.find(p=>p.key===selectedSpace)||programs[0];
const note=()=>'<p class="muted policy-note">목업 기준: 무료·1인 신청, 행사 시작 전 취소, 종료된 예약당 후기 1회. 실제 운영 정책은 협의 후 확정합니다.</p>';
const exampleBooking=()=>({key:programs[0].key,name:'실습 참가자',email:'reader@example.test',ref:'SH-PREVIEW-0001',created:Date.now(),cancelled:false,preview:true});
function applicationPreview(){const p=selected,s=state(p);return `<div class="panel form-panel"><span class="chip">신청서 미리보기</span><h2>${p.name}</h2><p>${timeLabel(s.start)} · ${p.place}</p><fieldset disabled><label class="field">신청자 이름 (필수)<input placeholder="실습 참가자"></label><label class="field">휴대전화 (필수)<input placeholder="01000000000"></label><label class="field">이메일 (필수)<input placeholder="reader@example.test"></label><label class="check"><input type="checkbox">개인정보 수집·이용 동의 (실습)</label><button class="button primary">로그인 후 신청 가능</button></fieldset></div>`}
function completionBody(b){return `<ol class="stepper"><li>01 신청서 작성</li><li>02 내용 확인</li><li class="active">03 신청 완료</li></ol><section class="panel completion-panel"><span class="complete-icon" aria-hidden="true">✓</span><h2>${b.preview?'신청 완료 화면 예시입니다':'책과 함께할 시간이 예약되었어요'}</h2><p>행사 일정과 장소를 확인해 주세요.</p><span class="chip open">${b.cancelled?'예약 취소':'예약 완료'}</span>${receipt(b)}<div class="controls">${b.preview?link(1,'프로그램 찾아보기','button primary'):`<a class="button primary" href="#${id(7)}" data-booking="${b.ref}">예약 상세 보기</a>`}${link(6,'나의 예약 내역')}${link(1,'다른 프로그램 찾기')}</div>${note()}</section>`}
function seedDemo(){
 if(!localStorage.getItem('shyu.reading.seed.v2')){
  const seed=[{...exampleBooking(),key:programs[1].key,ref:'SH-DEMO-UPCOMING',preview:undefined},{...exampleBooking(),key:programs[4].key,ref:'SH-DEMO-COMPLETED',preview:undefined}];
  if(persist([...bookings,...seed.filter(x=>!bookings.some(b=>b.ref===x.ref))]))localStorage.setItem('shyu.reading.seed.v2','true');
 }
}
function signInDemo(){signedIn=true;sessionStorage.setItem('shyu.reading.login','true');seedDemo();go(returnTo||14)}
function spaceSearch(){return `<form id="space-search" class="panel controls"><label class="field">공간명<input name="q" value="${escape(spaceFilters.q)}" placeholder="도서관, 책방 이름"></label><label class="field">지역<select name="district">${['',...districts].map(v=>`<option ${v===spaceFilters.district?'selected':''} value="${v}">${v||'전체 지역'}</option>`).join('')}</select></label><label class="field">공간 유형<select name="type">${['','독립서점','도서관·문화공간'].map(v=>`<option ${v===spaceFilters.type?'selected':''}>${v||'전체'}</option>`).join('')}</select></label><button class="button primary">검색</button><button type="button" class="button" data-action="space-reset">초기화</button></form>`}
function spacesView(map=false){
 const items=programs.filter(p=>(p.place.includes(spaceFilters.q))&&(!spaceFilters.district||p.district===spaceFilters.district)&&(!spaceFilters.type||placeType(p)===spaceFilters.type));
 const body=items.length?items.map(p=>`<article class="panel space-card">${photo(p,'space-art')}<div><span class="chip">${placeType(p)}</span><h2><a data-space="${p.key}" href="#${id(18)}">${p.place}</a></h2><p>${address(p)}</p><p class="muted">동네에서 책과 사람을 만나는 공간 · 진행 프로그램 ${state(p).progress==='종료'?0:1}개</p><a class="text-link" data-space="${p.key}" href="#${id(18)}">공간 살펴보기 →</a></div></article>`).join(''):empty('조건에 맞는 공간이 없습니다. 검색 조건을 변경해 주세요.');
 const mapHtml=`<section class="panel map-panel"><div class="map-heading"><div><p class="eyebrow">READING SPACES IN SEOUL</p><h2>프로그램이 열리는 독서 공간</h2></div><span class="chip">${items.length}개 공간</span></div><div id="reading-map" class="live-map" aria-label="독서 프로그램 장소 지도"></div><p id="map-status" class="muted map-notice" role="status"></p><p class="muted map-notice">공간명·주소·마커 위치는 기획 검토용 예시입니다. 마커를 선택하면 프로그램과 공간 정보를 확인할 수 있습니다.</p></section>`;

 return page('READING SPACES',map?'지도로 만나는 독서 공간':'우리 동네 독서 공간',`${spaceSearch()}<div class="result-heading"><p>전체 <strong>${items.length}</strong>개 공간</p><div class="controls">${link(17,'목록',map?'button':'button primary')}${link(8,'지도',map?'button primary':'button')}</div></div>${map?mapHtml:''}<div class="stack">${body}</div>`);
}
function spaceDetail(){const p=selectedPlace();return page('READING SPACES',p.place,`${link(17,'← 공간 목록','back')}<div class="columns"><section class="panel">${photo(p,'space-art large')}<h2>책이 있는 동네의 쉼표</h2><p>읽고, 쓰고, 함께 이야기하는 독서 문화공간입니다. 책에 관심 있는 누구나 프로그램을 통해 새로운 이야기를 만날 수 있습니다.</p>${details([['공간 유형',placeType(p)],['주소',address(p)],['운영시간','화–일 10:00–18:00 (예시)'],['문의','contact@example.test (실습용)'],['오시는 길',`${p.district} 소재 · 상세 교통편은 운영 시 등록`]])}${link(8,'공간 지도 보기')}</section><section><h2>이 공간의 프로그램</h2>${cards(programs.filter(x=>x.key===p.key))}</section></div>`)}
function reviewItem(r,own=false){const p=programFor(r);return `<article class="panel"><span class="chip">${p?.type||'독서 프로그램'}</span><h2><a href="#${id(20)}" data-review="${r.ref}">${escape(r.title||'함께 나눈 독서의 기억')}</a></h2><p class="muted">${escape(p?.name||'프로그램')} · ${r.sample?'독서하는 이**':'실습 회*'} · ${dateLabel(new Date(r.created))}</p><p>${escape(r.text.slice(0,110))}</p>${own?`<div class="controls"><a class="button" href="#${id(24)}" data-review="${r.ref}">수정</a><button class="button" data-delete-review="${r.ref}">삭제</button><span class="chip">공개</span></div>`:''}</article>`}
function pagination(count,current,key){const pages=Math.ceil(count/PAGE_SIZE);return pages>1?`<nav class="pagination" aria-label="페이지 이동">${Array.from({length:pages},(_,i)=>`<button class="button ${current===i+1?'primary':''}" data-${key}-page="${i+1}" ${current===i+1?'aria-current="page"':''}>${i+1}</button>`).join('')}</nav>`:''}
function publicReviews(){const items=allReviews().filter(r=>`${r.title||''} ${programFor(r)?.name}`.includes(reviewQuery)&&(!reviewType||programFor(r)?.type===reviewType));return page('READERS’ STORIES','책으로 이어진 이야기',`<p class="page-intro">함께 읽고 나눈 사람들의 경험을 만나보세요.</p><form id="public-review-search" class="board-search"><label>프로그램 유형<select name="type">${['',...types].map(t=>`<option value="${t}" ${reviewType===t?'selected':''}>${t||'전체'}</option>`).join('')}</select></label><label class="field">후기·프로그램 검색<input name="q" value="${escape(reviewQuery)}" placeholder="제목 또는 프로그램명"></label><button class="button primary">검색</button></form><p>전체 <strong>${items.length}</strong>건 · 최신순</p><div class="stack">${items.slice((reviewPageNumber-1)*PAGE_SIZE,reviewPageNumber*PAGE_SIZE).map(r=>reviewItem(r)).join('')||empty('검색 결과가 없습니다.')}</div>${pagination(items.length,reviewPageNumber,'review')}`)}
function publicReviewDetail(){const r=allReviews().find(r=>r.ref===selectedReview)||(!selectedReview?sampleReview:null);if(!r)return page('READERS’ STORIES','후기를 찾을 수 없습니다',link(19,'후기 목록'));return page('READERS’ STORIES','이용 후기',`${reviewItem(r)}<article class="panel article-body"><p>${escape(r.text)}</p><a class="text-link" href="#${id(2)}" data-program="${r.key}">관련 프로그램 보기 →</a></article><div class="controls">${link(19,'목록으로')}${signedIn&&!r.sample?`<a class="button" href="#${id(24)}" data-review="${r.ref}">수정</a><button class="button" data-delete-review="${r.ref}">삭제</button>`:''}</div>`)}
function myReviews(){return page('MY PAGE','나의 후기',!signedIn?gated('로그인 후 작성한 후기를 확인할 수 있습니다.'):`<p class="page-intro">책과 함께한 나의 기록을 모았습니다.</p><div class="stack">${reviews.map(r=>reviewItem(r,true)).join('')||empty('아직 작성한 후기가 없습니다.')}</div><div class="bottom-actions">${link(12,'후기 작성하기','button primary')}</div>`)}
function editReview(){if(!signedIn)return page('MY PAGE','후기 수정',gated('로그인 후 본인의 후기를 수정할 수 있습니다.'));const r=reviews.find(r=>r.ref===selectedReview);if(!r)return page('MY PAGE','후기 수정',`${empty('수정할 후기를 선택해 주세요.')}${link(23,'나의 후기 목록')}`);return page('MY PAGE','후기 수정',`<form id="edit-review" class="panel form-panel" novalidate><h2>${programFor(r)?.name}</h2><label class="field">후기 제목<input name="title" maxlength="80" value="${escape(r.title||'함께 나눈 독서의 기억')}"></label><label class="field">후기 내용<textarea name="body" rows="8" maxlength="1000">${escape(r.text)}</textarea></label><p class="muted">10~1,000자 · 개인정보를 입력하지 마세요.</p><p id="edit-error" class="error" role="alert"></p><div class="controls"><button class="button primary">수정 내용 저장</button>${link(23,'취소')}</div></form>`)}
function field(label,name,type='text',value='',placeholder=''){return `<label class="field">${label}<input name="${name}" type="${type}" value="${escape(value)}" placeholder="${placeholder}" autocomplete="off" required maxlength="100"></label>`}
function memberForm(kind){
 const labels={signup:'회원가입',recover:'계정 찾기',profile:'회원정보 조회·수정',password:'비밀번호 변경',withdraw:'회원 탈퇴'};
 if(['profile','password','withdraw'].includes(kind)&&!signedIn)return page('MY PAGE',labels[kind],gated('로그인 후 이용할 수 있습니다.'));
 if(['signup','recover'].includes(kind)&&signedIn)return page('ACCOUNT',labels[kind],`<div class="panel"><p>이미 로그인되어 있습니다.</p>${link(25,'내 정보 확인')}${link(28,'로그아웃')}</div>`);
 const fields=kind==='signup'?`${field('아이디','account')}${field('이름','name')}${field('이메일','email','email')}${field('비밀번호 (영문·숫자 포함 8자 이상)','password','password')}${field('비밀번호 확인','confirm','password')}<label class="check"><input name="agree" type="checkbox">이용약관 및 개인정보 수집·이용 동의 (필수·실습)</label><label class="check"><input name="marketing" type="checkbox">프로그램 소식 받기 (선택)</label>`:
 kind==='recover'?`<label class="field">찾을 항목<select name="mode"><option value="id">아이디 찾기</option><option value="password">비밀번호 재설정</option></select></label>${field('가입 시 이름','name')}${field('가입 시 이메일','email','email')}<label class="check"><input type="checkbox" name="verify">실습용 본인확인을 완료했습니다 (실제 인증 아님)</label>${field('재설정할 새 비밀번호 (재설정 선택 시)','password','password')}${field('새 비밀번호 확인','confirm','password')}`:
 kind==='profile'?`<p class="muted">회원 ID: study-reader · 변경할 수 없습니다.</p>${field('이름','name','text',profile.name)}${field('연락처','phone','tel',profile.phone)}${field('이메일','email','email',profile.email)}<label class="check"><input type="checkbox" name="verify">실습용 본인 재확인 (실제 인증 아님)</label>`:
 kind==='password'?`${field('현재 비밀번호 (실습 입력)','current','password')}${field('새 비밀번호 (영문·숫자 포함 8자 이상)','password','password')}${field('새 비밀번호 확인','confirm','password')}<p class="muted">실제 비밀번호는 입력하지 마세요. 현재 비밀번호 검증은 재현하지 않으며 입력값은 저장하지 않습니다.</p>`:
 `<div class="info-box">탈퇴 시 이 브라우저의 실습 회원정보·예약·후기를 삭제합니다. 진행 예정인 유효 예약은 먼저 취소해 주세요. 실제 운영의 보관 정책은 별도 확정합니다.</div><label class="check"><input type="checkbox" name="verify">실습용 본인 재확인</label><label class="check"><input type="checkbox" name="agree">위 내용을 확인했으며 실습 데이터 삭제에 동의합니다.</label>`;
 return page(['profile','password','withdraw'].includes(kind)?'MY PAGE':'ACCOUNT',labels[kind],`<form class="panel form-panel" id="member-${kind}" novalidate><h2>${labels[kind]}</h2><p class="muted">실습용 화면입니다. 실제 개인정보·비밀번호를 입력하지 마세요.</p>${fields}<p class="error" id="member-error" role="alert"></p><p id="member-result" class="success-message" role="status" hidden></p><div class="controls"><button class="button primary">${kind==='recover'?'결과 확인':kind==='withdraw'?'탈퇴 신청':kind==='signup'?'가입하기':'변경 내용 저장'}</button>${link(kind==='signup'||kind==='recover'?3:6,'돌아가기')}</div>${kind==='profile'?`<div class="account-links">${link(26,'비밀번호 변경','text-link')}${link(27,'회원 탈퇴','text-link')}</div>`:''}</form>`);
}
function memberSubmit(form){
 const kind=form.id.replace('member-',''),v=Object.fromEntries(new FormData(form)),err=document.querySelector('#member-error'),result=document.querySelector('#member-result');
 err.textContent='';result.hidden=true;
 const fail=(msg,name)=>{err.textContent=msg;if(name)form.elements[name].focus()};
 if(['profile','password','withdraw'].includes(kind)&&!signedIn)return fail('로그인이 필요합니다.');
 const validPass=p=>/^(?=.*[A-Za-z])(?=.*\d).{8,100}$/.test(p||'');
 if(['signup','profile','recover'].includes(kind)&&!v.name?.trim())return fail('이름을 입력해 주세요.','name');
 if(['signup','profile','recover'].includes(kind)&&! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email||''))return fail('이메일 형식을 확인해 주세요.','email');
 if(kind==='profile'&&!/^010\d{8}$/.test(v.phone||''))return fail('연락처는 010으로 시작하는 숫자 11자리로 입력해 주세요.','phone');
 if(kind==='signup'&&!/^[A-Za-z][A-Za-z0-9_-]{3,19}$/.test(v.account||''))return fail('아이디는 영문으로 시작하는 영문·숫자 4~20자로 입력해 주세요.','account');
 if(kind==='signup'&&['admin','study-reader'].includes(v.account))return fail('실습 예시에서 이미 사용 중인 아이디입니다.','account');
 if(kind==='password'&&!v.current)return fail('현재 비밀번호에 실습값을 입력해 주세요.','current');
 if((['signup','password'].includes(kind)||(kind==='recover'&&v.mode==='password'))&&(!validPass(v.password)||v.password!==v.confirm))return fail('새 비밀번호는 영문·숫자 8자 이상이며 확인값이 같아야 합니다.','password');
 if(kind==='password'&&v.current===v.password)return fail('다른 새 비밀번호를 입력해 주세요.','password');
 if(['signup','withdraw'].includes(kind)&&!v.agree)return fail('필수 동의를 확인해 주세요.','agree');
 if(['profile','recover','withdraw'].includes(kind)&&!v.verify)return fail('실습용 본인확인을 선택해 주세요.','verify');
 if(kind==='withdraw'){
  if(bookings.some(b=>!b.cancelled&&state(programFor(b)).progress!=='종료'))return fail('진행 예정 또는 진행 중인 예약을 먼저 취소해 주세요.');
  return popup(`${id(27)}-p01`,'회원 탈퇴 확인','이 브라우저의 실습 예약·후기·회원정보를 삭제할까요?',()=>{try{[bookingsKey,reviewsKey,'shyu.reading.profile','shyu.reading.seed.v2'].forEach(k=>localStorage.removeItem(k));bookings=[];reviews=[];profile={name:'실습 회원',email:'reader@example.test',phone:'01000000000'};signedIn=false;sessionStorage.removeItem('shyu.reading.login');go(14)}catch{fail('실습 데이터를 삭제하지 못했습니다.')}},'탈퇴 및 삭제');
 }
 if(kind==='profile'){try{const next={name:v.name.trim(),phone:v.phone,email:v.email};localStorage.setItem('shyu.reading.profile',JSON.stringify(next));profile=next}catch{return fail('변경 내용을 저장하지 못했습니다.')}}
 result.hidden=false;result.textContent=kind==='signup'?'가입 완료 화면입니다. 실제 계정은 생성하지 않았습니다. 로그인에서 실습 회원으로 시작해 주세요.':kind==='recover'?(v.mode==='id'?'실습 아이디: study-reader (실제 계정 조회 아님)':'비밀번호 재설정 완료 화면입니다. 실제 계정 비밀번호는 변경하지 않았습니다.'):kind==='password'?'비밀번호 변경 완료 화면입니다. 입력값은 저장하지 않았습니다.':'회원정보를 이 브라우저에 임시 저장했습니다.';
 form.querySelectorAll('input[type=password]').forEach(x=>x.value='');editDirty=false;
}
function logoutView(){if(signedIn){signedIn=false;sessionStorage.removeItem('shyu.reading.login');selectedBooking=null;}return page('ACCOUNT','로그아웃되었습니다',`<section class="panel"><p>다음 책과의 만남에서 다시 만나요.</p><div class="controls">${link(14,'홈으로','button primary')}${link(3,'로그인')}</div></section>`)}

const {home,introduction,usage}=window.createShyuViews({hero,page,link,cards,programs,state,notices,id,types,note});

const specs=[
 ['apply-confirm',4,'예약 신청 확인','레이어 컨펌','필수 입력값이 유효한 상태에서 제출 내용 확인 선택','입력한 정보로 예약을 신청할까요?','접수 조건을 재확인하고 저장 성공 시 신청 완료 화면으로 이동','신청서 입력을 유지합니다.'],
 ['cancel-confirm',7,'예약 취소 확인','레이어 컨펌','행사 시작 전 예약 취소 선택','이 예약을 취소할까요?','취소를 저장하고 예약 상세 및 목록에 상태를 반영','현재 예약 상태를 유지합니다.'],
 ['phone-format',4,'휴대전화 형식','인라인 오류','휴대전화가 010으로 시작하는 숫자 11자리가 아닐 때','010으로 시작하는 숫자 11자리를 입력해 주세요.','신청서에 머물며 오류 항목으로 이동','']
];
specs.push(['review-confirm',12,'후기 등록 확인','레이어 컨펌','평점과 후기 검증을 통과한 뒤 등록 선택','작성한 이용 후기를 등록할까요?','저장 후 작성 결과 표시','입력 내용 유지']);
window.GFAIR_MESSAGE_SPECS=specs.map(([key,n,title,type,trigger,message,confirm,cancel])=>({key,screens:[id(n)],title,type,trigger,message,confirm,cancel}));
function draw(){
 let hash=location.hash.slice(1);
 const legacy=/^SH-LIB-(\d{2})$/.exec(hash);
 if(legacy&&Number(legacy[1])<=13){hash=id(Number(legacy[1]));history.replaceState(null,'',`#${hash}`)}
 const index=screens.findIndex(s=>s.id===hash),n=index<0?14:index+1;
 if(!hash){hash=id(14);history.replaceState(null,'',`#${hash}`)}
 document.body.dataset.screen=hash;
 document.querySelector('#account-link').textContent=signedIn?'로그아웃':'로그인';
 const currentGroup=n===9?'calendar':[19,20].includes(n)?'review':[1,2,4,5].includes(n)?'program':'';
 document.querySelectorAll('[data-nav]').forEach(a=>a.setAttribute('aria-current',a.dataset.nav===currentGroup?'page':'false'));
 document.title=`${hash==='screens'?'화면검색':screens[n-1].title} · 서울 독서행사`;
 if(hash==='screens'){
  const items=screens.filter(s=>`${s.id} ${s.title}`.toLowerCase().includes(search.toLowerCase()));
  content.innerHTML=page('SCREEN INDEX','화면검색',`<form id="reading-screen-search" class="controls"><label>화면 ID 또는 이름 <input name="q" value="${escape(search)}"></label><button class="button">검색</button></form><ul>${items.map(s=>`<li><a href="#${s.id}">${s.id} · ${s.title}</a></li>`).join('')}</ul>${items.length?'':empty('검색 결과가 없습니다.')}`);
  return;
 }
 content.innerHTML=[()=>explore(1),detail,login,application,completion,myList,bookingDetail,()=>spacesView(true),()=>explore(9),noticeList,faq,reviewPage,noticeDetail,home,introduction,usage,()=>spacesView(false),spaceDetail,publicReviews,publicReviewDetail,()=>memberForm('signup'),()=>memberForm('recover'),myReviews,editReview,()=>memberForm('profile'),()=>memberForm('password'),()=>memberForm('withdraw'),logoutView][n-1]();
 document.querySelector('#account-link').textContent=signedIn?'로그아웃':'로그인';
 if(n===8){const items=programs.filter(p=>p.place.includes(spaceFilters.q)&&(!spaceFilters.district||p.district===spaceFilters.district)&&(!spaceFilters.type||placeType(p)===spaceFilters.type));window.ShyuMap?.mount(document.getElementById('reading-map'),items,selectedSpace,key=>{selectedSpace=key;go(18)});}
 if(n===9){const head=content.querySelector('.cal-head');head?.insertAdjacentHTML('afterend','<button type="button" class="button today-button" data-action="today">오늘</button>')}
 if(n===12){const form=content.querySelector('#reading-review');form?.querySelector('label:nth-of-type(2)')?.insertAdjacentHTML('beforebegin',field('후기 제목 (필수)','title'));}
 if(n===4&&signedIn&&content.querySelector('#reading-application'))content.querySelector('#reading-application').insertAdjacentHTML('beforebegin','<ol class="stepper"><li class="active">01 신청서 작성</li><li>02 내용 확인</li><li>03 신청 완료</li></ol>');
}
content.addEventListener('submit',event=>{
 const form=event.target;event.preventDefault();
 if(form.id==='home-search'){filters.q=form.elements.q.value.trim();programPage=1;go(1)}
 if(form.id==='reading-filters'){filters=Object.fromEntries(new FormData(form));programPage=1;pinKey='';draw();document.querySelector('#reading-filters button').focus()}
 if(form.id==='reading-screen-search'){search=form.elements.q.value.trim();draw();document.querySelector('#reading-screen-search input').focus()}
 if(form.id==='reading-login'){const v=Object.fromEntries(new FormData(form)),error=document.getElementById('login-error');if(!v.account.trim()||!v.password){error.textContent='아이디와 비밀번호를 입력해 주세요.';form.elements[!v.account.trim()?'account':'password'].focus()}else signInDemo()}
 if(form.id==='reading-application')apply(form);
 if(form.id==='notice-search'){noticeQuery=form.elements.q.value.trim();noticePage=1;draw();content.querySelector('#notice-keyword').focus();}
 if(form.id==='faq-search'){faqQuery=form.elements.q.value.trim();faqCategory=form.elements.category.value;draw();content.querySelector('#faq-keyword').focus();}
 if(form.id==='reading-review')saveReview(form);
 if(form.id.startsWith('member-'))memberSubmit(form);
 if(form.id==='space-search'){spaceFilters=Object.fromEntries(new FormData(form));if(spaceFilters.type==='전체')spaceFilters.type='';draw()}
 if(form.id==='public-review-search'){reviewQuery=form.elements.q.value.trim();reviewType=form.elements.type.value;reviewPageNumber=1;draw()}
 if(form.id==='my-filter'){myStatus=form.elements.status.value;myFrom=form.elements.from.value;myTo=form.elements.to.value;draw()}
 if(form.id==='edit-review'){
  const r=reviews.find(r=>r.ref===selectedReview),text=form.elements.body.value.trim(),title=form.elements.title.value.trim();
  const error=document.getElementById('edit-error');
  if(!signedIn||!r){error.textContent='수정할 후기를 확인해 주세요.';return}
  if(!title||text.length<10||text.length>1000){error.textContent='제목과 10~1,000자의 후기를 입력해 주세요.';return}
  try{const next=reviews.map(x=>x.ref===r.ref?{...x,title,text}:x);localStorage.setItem(reviewsKey,JSON.stringify(next));reviews=next;editDirty=false;go(20)}catch{error.textContent='저장하지 못했습니다. 입력 내용은 유지됩니다.'}
 }
});
document.querySelector('#account-link').addEventListener('click',event=>{
 event.preventDefault();if(signedIn)go(28);else{ returnTo=14;go(3)}
});
document.querySelector('.site-header').addEventListener('click',event=>{
 if(event.target.closest('a')) document.querySelectorAll('.nav-group[open]').forEach(menu=>{menu.open=false;});
});
content.addEventListener('click',event=>{
 const control=event.target.closest('button,a');if(!control)return;
 const {program,booking,action,pin,day,month:monthStep,notice,status}=control.dataset;
 if(action==='demo-login'){signInDemo();return}
 if(action==='space-reset'){spaceFilters={q:'',type:'',district:''};draw()}
 if(action==='my-reset'){myStatus='';myFrom='';myTo='';draw()}
 if(action==='today'){month=new Date(now.getFullYear(),now.getMonth(),1);chosenDate=dateKey(now);draw()}
 if(control.dataset.space){selectedSpace=control.dataset.space;if(location.hash===`#${id(18)}`)draw()}
 if(control.dataset.spacePin){selectedSpace=control.dataset.spacePin;draw()}
 if(control.dataset.review){selectedReview=control.dataset.review;if(location.hash===`#${id(20)}`||location.hash===`#${id(24)}`)draw()}
 if(control.dataset.reviewBooking){reviewRef=control.dataset.reviewBooking}
 if(control.dataset.programPage){programPage=Number(control.dataset.programPage);draw()}
 if(control.dataset.reviewPage){reviewPageNumber=Number(control.dataset.reviewPage);draw()}
 if(control.dataset.noticePage){noticePage=Number(control.dataset.noticePage);draw()}
 if(control.dataset.deleteReview&&signedIn){const ref=control.dataset.deleteReview;popup(`${location.hash.slice(1)}-p01`,'후기 삭제 확인','이 후기를 삭제할까요? 삭제한 후기는 복구할 수 없습니다.',()=>{const error=()=>{control.insertAdjacentHTML('afterend','<p class="error" role="alert">삭제 내용을 저장하지 못했습니다.</p>')};try{const next=reviews.filter(r=>r.ref!==ref);localStorage.setItem(reviewsKey,JSON.stringify(next));reviews=next;editDirty=false;go(23)}catch{error()}},'삭제')}
 if(notice){selectedNotice=notices.find(n=>n.key===notice)||notices[0];sessionStorage.setItem('shyu.reading.notice',selectedNotice.key);if(location.hash===`#${id(13)}`)draw();}
 if(status!==undefined){filters.status=status;draw();content.querySelector(`[data-status="${status}"]`)?.focus();}
 if(program){selected=programs.find(p=>p.key===program);sessionStorage.setItem("shyu.reading.program",program);if(location.hash===`#${id(2)}`)draw()}
 if(booking){selectedBooking=bookings.find(b=>b.ref===booking);sessionStorage.setItem("shyu.reading.booking",booking);if(location.hash===`#${id(7)}`)draw()}
 if(pin){pinKey=pin;draw();content.querySelector(`[data-pin="${pin}"]`)?.focus()}
 if(day){chosenDate=day;draw();content.querySelector(`[data-day="${day}"]`)?.focus()}
 if(monthStep){month=new Date(month.getFullYear(),month.getMonth()+Number(monthStep),1);chosenDate='';draw();content.querySelector(`[data-month="${monthStep}"]`)?.focus()}
 if(action==='reset'){filters={q:'',type:'',district:'',progress:'',status:'',date:'',sort:'event'};programPage=1;pinKey='';draw();content.querySelector('[data-action=reset]').focus()}
 if(action==='apply'){returnTo=2;go(signedIn?4:3)}
 if(action==='login'){returnTo=screens.findIndex(s=>s.id===location.hash.slice(1))+1||6;go(3)}
 if(action==='cancel'&&canCancel(selectedBooking)){
  const target=selectedBooking;
  popup(`${id(7)}-p01`,'예약 취소 확인','이 예약을 취소할까요?',()=>{
   if(!canCancel(target)){document.querySelector('#cancel-error').textContent='취소 가능 시간이 지났습니다.';return}
   const cancelled={...target,cancelled:true,cancelledAt:Date.now()};
   if(!persist(bookings.map(b=>b.ref===target.ref?cancelled:b))){document.querySelector('#cancel-error').textContent='취소를 저장하지 못했습니다.';return}
   selectedBooking=cancelled;draw();content.focus();
  },'예약 취소');
 }
});
let lastHash=location.hash;
content.addEventListener('input',event=>{if(event.target.closest('#reading-application,#reading-review,#edit-review,[id^="member-"]'))editDirty=true;});
window.addEventListener('beforeunload',event=>{if(editDirty){event.preventDefault();event.returnValue='';}});
window.addEventListener('hashchange',()=>{
 if(editDirty){const destination=location.hash;history.replaceState(null,'',lastHash||`#${id(14)}`);popup(`${lastHash.slice(1)||id(14)}-p02`,'작성 중인 내용이 있습니다','저장하지 않은 내용을 버리고 이동할까요?',()=>{editDirty=false;location.hash=destination},'이동');return;}
 if(dialog.open)dialog.close();draw();lastHash=location.hash;content.focus();window.scrollTo(0,0);
});
draw();
lastHash=location.hash;
})();
