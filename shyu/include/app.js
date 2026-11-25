(()=>{
const {screenDefs,types,districts,rows,notices,questions,programImages,spaceImages,mapPositions}=window.SHYU_DATA;

// 사이트맵 ID는 보존하고 서버가 허용하는 단일 접두부 ID로 화면·Description을 연결합니다.
const compatibleId=value=>value.replace(/^SH-([A-Z]+)-(\d{2})(.*)$/, 'SH$1-$2$3');
const screens=screenDefs.map(([planningId,title])=>({id:compatibleId(planningId),planningId,title,summary:title}));
window.GFAIR_SCREENS=[{name:'책이음',screens}];
const id=n=>screens[n-1].id;
const {poster,breadcrumb,steps}=window.ShyuConsumerUI;
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
const favoritesKey='shyu.reading.favorites.v1';
let favorites=read(localStorage,favoritesKey,[]);if(!Array.isArray(favorites))favorites=[];
let pendingFavorite='',programPageSize=3,galleryIndex=0;
let filters={q:'',type:'',district:'',progress:'',status:'',date:'',sort:'event'}, pinKey='', search='', programPage=1;
let month=new Date(now.getFullYear(),now.getMonth(),1), chosenDate=dateKey(now);
const link=(n,label,cls='button')=>`<a class="${cls}" href="#${id(n)}">${label}</a>`;
const go=n=>{if(location.hash===`#${id(n)}`)draw();else location.hash=id(n)};
const page=(tag,title,body)=>{
 const guide=tag==='GUIDE',my=tag==='MY PAGE'||tag==='MY RESERVATIONS';
 const menus=guide?[[10,'공지사항'],[11,'자주 묻는 질문']]:my?[[6,'나의 예약 내역'],[12,'후기 작성'],[23,'나의 후기'],[29,'찜한 프로그램'],[25,'내 정보']]:tag==='ABOUT'||tag==='HOW TO USE'?[[15,'서비스 안내'],[16,'이용 방법']]:[];
 const tabs=menus.length?'<nav class="section-tabs" aria-label="하위 메뉴">'+menus.map(([n,label])=>'<a href="#'+id(n)+'" '+(location.hash.slice(1)===id(n)?'aria-current="page"':'')+'>'+label+'</a>').join('')+'</nav>':'';
 const subtitle=tag==='PROGRAMS'?'우리 동네에서 열리는 책과의 만남을 찾아보세요.':my?'책과 함께할 일정과 나의 기록을 확인해 보세요.':tag==='RESERVATION'?'참여 정보를 확인하고 책과의 만남을 준비해 주세요.':'';
 return '<section class="frame page page-'+tag.toLowerCase().replaceAll(' ','-')+'">'+breadcrumb(title)+'<div class="page-heading"><span class="heading-book" aria-hidden="true">'+(my||tag==='RESERVATION'?window.ShyuConsumerUI.bookMark:'')+'</span><h1>'+title+'</h1>'+(subtitle?'<p>'+subtitle+'</p>':'')+'</div>'+tabs+body+'</section>';
};
const empty=message=>`<p class="empty">${message}</p>`;
function sessions(p){return (p.key==='book-1'?[p.offset,p.offset+7,p.offset+14]:[p.offset]).map(offset=>({start:dateAt(offset,14),end:dateAt(offset,16)}));}
function canView(p){const s=state(p);return s.status==='접수 중'&&s.progress!=='종료';}
function unavailable(p){return page('PROGRAMS','프로그램 안내','<div class="panel"><p>'+escape(p?state(p).status+' · '+state(p).progress+' 상태의 프로그램은 상세 정보를 열 수 없습니다.':'존재하지 않거나 삭제된 프로그램입니다.')+'</p>'+link(1,'프로그램 목록으로','button primary')+'</div>');}
function state(p){
 const schedule=sessions(p),start=schedule[0].start,end=schedule.at(-1).end;
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
 (!filters.progress||s.progress===filters.progress)&&(!filters.status||s.status===filters.status)&&(!filters.date||sessions(p).some(session=>localDate(session.start)===filters.date));
}
const option=(key,items)=>['',...items].map(x=>`<option value="${x}" ${filters[key]===x?'selected':''}>${x||'전체'}</option>`).join('');
function filterBar(){
 return '<form class="discovery-search" id="reading-filters"><fieldset class="type-choices"><legend class="sr-only">프로그램 유형</legend>'+['',...types].map(t=>'<label class="type-choice"><input type="radio" name="type" value="'+t+'" '+(filters.type===t?'checked':'')+'><span>'+(t||'전체 프로그램')+'</span></label>').join('')+'</fieldset><div class="discovery-search-row"><label class="search-keyword"><span class="sr-only">프로그램명</span><input name="q" value="'+escape(filters.q)+'" placeholder="어떤 책과의 만남을 찾고 있나요?"></label><label><span class="sr-only">서울 자치구</span><select name="district">'+option('district',districts)+'</select></label><button class="button primary">검색</button><button class="button search-reset" type="button" data-action="reset">초기화</button></div><details class="advanced-search" '+(filters.progress||filters.status||filters.date||filters.sort!=='event'?'open':'')+'><summary>날짜·접수 상태로 더 찾아보기</summary><div class="advanced-fields"><label class="field">행사일<input type="date" name="date" value="'+(filters.date||'')+'"></label><label class="field">접수 상태<select name="status">'+option('status',['접수 예정','접수 중','접수 마감'])+'</select></label><label class="field">진행 상태<select name="progress">'+option('progress',['진행 예정','진행 중','종료'])+'</select></label><label class="field">정렬<select name="sort"><option value="event" '+(filters.sort==='event'?'selected':'')+'>행사일 빠른순</option><option value="deadline" '+(filters.sort==='deadline'?'selected':'')+'>접수 마감일순</option></select></label></div><p>조건을 선택한 뒤 검색을 눌러 주세요.</p></details></form>';
}
function photo(p,cls='card-art'){const image=cls.includes('space-art')?p.spaceImage:p.image;return `<div class="${cls} photo-art"><img src="assets/images/${image.file}" alt="${image.alt}" style="object-position:${image.position}" loading="lazy" decoding="async"></div>`}
function card(p){
 const s=state(p),available=canView(p);
 const open=(body,cls='')=>available?'<a class="'+cls+'" data-program="'+p.key+'" href="#'+id(2)+'">'+body+'</a>':'<div class="'+cls+'" aria-disabled="true">'+body+'</div>';
 return '<article class="card '+(!available?'program-unavailable':'')+'">'+open(poster(p),'poster-link')+'<div class="card-content"><div class="card-badges"><span class="chip '+(s.status==='접수 중'?'open':'closed')+'">'+s.status+'</span><span class="chip">'+s.progress+'</span><span class="card-type">'+p.type+'</span></div><h3>'+open(p.name)+'</h3><p class="card-description">'+p.description+'</p><p class="card-date">'+timeLabel(s.start)+(sessions(p).length>1?' 외 '+(sessions(p).length-1)+'회':'')+'</p><p class="muted">성인 · '+p.district+' · '+p.place+'</p><p class="card-capacity">무료 · 잔여 '+Math.max(0,p.capacity-s.count)+'명 <span>접수 ~ '+dateLabel(s.closes)+'</span></p>'+(!available?'<p class="availability-note">'+(s.progress==='종료'?'종료된 프로그램입니다.':'현재 상세 조회가 불가합니다.')+'</p>':'')+'</div></article>';
}
const cards=items=>items.length?`<div class="cards">${items.map(card).join('')}</div>`:empty('조건에 맞는 프로그램이 없습니다. 검색 조건을 변경해 보세요.');
const hero=`<div class="hero"><div class="frame hero-inner"><div><p class="eyebrow">SEOUL READING PROGRAMS</p><h1>서울에서 만나는<br>책과 이야기</h1><p>독서모임, 작가와의 만남, 동네서점 북토크를 한곳에서 찾아보세요.</p></div>
 <svg class="hero-art" viewBox="0 0 360 220" aria-hidden="true"><circle cx="184" cy="108" r="96" fill="#eef1de"/><path d="M45 186h270" stroke="#456e52" stroke-width="3" stroke-linecap="round"/><rect x="80" y="91" width="38" height="94" rx="5" fill="#bd6a43"/><rect x="123" y="66" width="38" height="119" rx="5" fill="#356449"/><rect x="167" y="78" width="30" height="107" rx="5" fill="#dca958"/><path d="M210 104l27-12 39 83-27 12z" fill="#6b8b72"/><path d="M92 107h14m29-24h14m30 13h7" stroke="#fff2d6" stroke-width="3" stroke-linecap="round"/><path d="M264 62v26m-13-13h26" stroke="#bd6a43" stroke-width="3" stroke-linecap="round"/></svg></div></div>`;
function explore(n){
 const items=programs.filter(match).sort((a,b)=>state(a)[filters.sort==='deadline'?'closes':'start']-state(b)[filters.sort==='deadline'?'closes':'start']);
 const modes=[[1,'목록'],[9,'캘린더']].map(([i,name])=>`<a class="mode" href="#${id(i)}" ${n===i?'aria-current="page"':''}>${name}</a>`).join('');
 const body=`${filterBar()}<div class="result-heading"><h2>프로그램 <small>${items.length}건</small></h2><div class="controls"><label class="result-size">표시 건수 <select id="program-page-size" aria-label="페이지당 표시 건수">${[3,6,12].map(size=>'<option value="'+size+'" '+(size===programPageSize?'selected':'')+'>'+size+'개씩 보기</option>').join('')}</select></label><nav class="controls" aria-label="탐색 방식">${modes}</nav></div></div>${n===9?calendarView(items):cards(items.slice((programPage-1)*programPageSize,programPage*programPageSize))+pagination(items.length,programPage,'program',programPageSize)}`;
 return page('PROGRAMS',n===9?'독서 캘린더':'독서 프로그램',body);
}
function calendarView(items){
 const y=month.getFullYear(),m=month.getMonth(),days=new Date(y,m+1,0).getDate();
 const cells=Array.from({length:month.getDay()},()=>'<span class="calendar-blank" aria-hidden="true"></span>');
 for(let i=1;i<=days;i++){
  const k=dateKey(new Date(y,m,i)),events=items.filter(p=>sessions(p).some(session=>dateKey(session.start)===k));
  cells.push('<button type="button" class="day '+(events.length?'has-event':'')+'" data-day="'+k+'" aria-label="'+(m+1)+'월 '+i+'일, 행사 '+events.length+'건" aria-pressed="'+(chosenDate===k)+'"><span class="day-number">'+i+'</span>'+(events.length?'<span class="calendar-event-preview">'+events.map(p=>'<span>'+escape(p.name)+'</span>').join('')+'</span><small>'+events.length+'개 프로그램</small>':'')+'</button>');
 }
 const dayItems=items.filter(p=>sessions(p).some(session=>dateKey(session.start)===chosenDate));
 const rows=dayItems.map(p=>{const st=state(p);return '<a class="calendar-program '+(!canView(p)?'program-unavailable':'')+'" '+(!canView(p)?'aria-disabled="true"':'')+' data-program="'+p.key+'" href="#'+id(2)+'">'+poster(p)+'<div><span class="chip '+(st.status==='접수 중'?'open':'closed')+'">'+st.status+'</span><h3>'+p.name+'</h3><p>14:00–16:00 · '+p.place+'</p><small>'+p.type+' · '+p.district+'</small></div></a>';}).join('');
 return '<div class="calendar-discovery"><section class="calendar-sheet"><div class="cal-head"><div><p>책과 함께할 하루를 골라보세요</p><h2>'+y+'년 <em>'+(m+1)+'월</em></h2></div><div class="controls"><button class="button" data-month="-1" aria-label="이전 달">‹</button><button type="button" class="button" data-action="today">오늘</button><button class="button" data-month="1" aria-label="다음 달">›</button></div></div><div class="calendar">'+'일 월 화 수 목 금 토'.split(' ').map(d=>'<strong>'+d+'</strong>').join('')+cells.join('')+'</div><p class="calendar-legend"><span></span> 프로그램이 있는 날 · 날짜를 선택하면 오른쪽에서 자세히 볼 수 있어요.</p></section><aside class="calendar-day-list"><p class="eyebrow">선택한 날의 책이음</p><h2>'+(chosenDate?chosenDate.replaceAll('/','.'):'날짜별 프로그램')+'</h2><p>'+dayItems.length+'개의 만남이 기다리고 있어요.</p>'+((chosenDate&&rows)?rows:'<div class="calendar-empty"><span aria-hidden="true">'+window.ShyuConsumerUI.bookMark+'</span><h3>잠시, 책 한 권의 여유</h3><p>선택한 날짜에는 프로그램이 없어요.<br>표시된 다른 날짜를 골라보세요.</p></div>')+'</aside></div>';
}
const details=items=>`<dl class="details">${items.map(([label,value])=>`<dt>${label}</dt><dd>${escape(value)}</dd>`).join('')}</dl>`;
const ownActive=p=>bookings.find(b=>b.key===p.key&&!b.cancelled);
function detail(){
 const p=selected;if(!p||!canView(p))return unavailable(p);const s=state(p),booking=signedIn&&ownActive(p);
 const applyButton=booking?'<a class="button primary" data-booking="'+booking.ref+'" href="#'+id(7)+'">내 예약 보기</a>':'<button class="button primary" data-action="apply" '+(s.reason?'disabled':'')+'>'+(s.reason||'신청하기')+'</button>';
 return '<section class="frame page detail-page">'+breadcrumb('독서 프로그램 · 프로그램 상세')+'<div class="detail-hero">'+poster(p,true)+'<div class="detail-summary"><div class="detail-topline"><span>'+p.type+'</span><span class="chip '+(s.reason?'closed':'open')+'">'+s.status+'</span></div><h1>'+p.name+'</h1><p class="detail-description">'+p.description+'</p>'+details([['행사 일시',sessions(p).map(session=>timeLabel(session.start)+' ~ 16:00').join(' / ')],['장소',p.place+' · '+p.district],['대상','독서에 관심 있는 성인'],['참가비','무료'],['잔여 정원',Math.max(0,p.capacity-s.count)+'명'],['접수 기간',dateLabel(s.opens)+' ~ '+dateLabel(s.closes)]])+'<div class="detail-actions">'+applyButton+'<button type="button" class="button favorite-button" data-favorite="'+p.key+'" aria-pressed="'+(signedIn&&favorites.includes(p.key))+'">'+(signedIn&&favorites.includes(p.key)?'찜 해제':'찜하기')+'</button>'+link(1,'목록으로')+'</div>'+(s.reason?'<p class="muted">'+s.reason+'으로 신청할 수 없습니다.</p>':'')+'</div></div><nav class="detail-tabs" aria-label="상세 내용 바로가기"><button data-scroll="program-intro">프로그램 소개</button><button data-scroll="program-place">일정·장소</button><button data-scroll="program-reviews">참여 후기</button><button data-scroll="program-policy">신청 안내</button></nav><div class="detail-body"><div><section class="editorial-section" id="program-intro"><div class="intro-split"><div><h2>책을 덮은 뒤,<br><em>이야기가 시작됩니다</em></h2><p>책을 사이에 두고 생각과 감상을 나누는 시간.<br>나에게 맞는 책과의 만남을 준비해 보세요.</p></div>'+photo(p)+'</div><p class="detail-progress">현재 '+s.progress+'인 프로그램입니다. 접수 여부와 참가 조건은 위의 신청 안내에서 확인해 주세요.</p></section><section class="editorial-section" id="program-place"><h2>만나는 공간</h2>'+photo(p,'space-art large')+'<h3>'+p.place+'</h3><p>'+address(p)+'</p><a class="text-link" data-space="'+p.key+'" href="#'+id(18)+'">공간 정보 살펴보기</a></section><section class="editorial-section" id="program-reviews"><div class="result-heading"><h2>참여자의 이야기</h2>'+link(19,'후기 전체 보기','text-link')+'</div>'+reviewBlock(p)+'</section><section class="editorial-section policy-section" id="program-policy"><h2>신청 전 확인해 주세요</h2><ul><li>신청 가능 여부는 접수기간과 잔여 정원에 따라 달라집니다.</li><li>예약 취소는 행사 시작 전까지 나의 예약 내역에서 할 수 있습니다.</li><li>같은 프로그램은 중복 신청할 수 없습니다.</li></ul>'+note()+'</section></div><aside class="booking-sticky"><strong>함께할 준비가 되셨나요?</strong><p>참여 정보를 확인하고 신청해 주세요.</p>'+applyButton+'</aside></div></section>';
}
const login=()=>page('ACCOUNT','로그인',signedIn?`<div class="panel"><p>로그인되어 있습니다.</p>${link(6,'나의 예약 확인')}${link(28,'로그아웃')}</div>`:`<div class="account-layout"><form id="reading-login" class="panel form-panel" novalidate><h2>다시 만나 반가워요</h2><p>책과 함께하는 다음 일정을 준비해 보세요.</p><label class="field">아이디<input name="account" autocomplete="off" placeholder="아이디를 입력하세요" required></label><label class="field">비밀번호<input name="password" type="password" autocomplete="off" placeholder="비밀번호를 입력하세요" required></label><p class="error" id="login-error" role="alert"></p><button class="button primary">로그인</button><div class="account-links">${link(21,'회원가입','text-link')}${link(22,'아이디·비밀번호 찾기','text-link')}</div></form><aside class="panel"><h2>책과 함께하는 새로운 만남</h2><p>관심 있는 프로그램을 찾고 나의 다음 일정을 준비해 보세요.</p><button class="button" data-action="demo-login">체험 계정으로 둘러보기</button></aside></div>`);
function gated(message){return `<div class="panel"><p>${message}</p><button class="button primary" data-action="login">로그인</button></div>`}
function application(){
 if(!signedIn)return page('RESERVATION','책과의 만남, 신청해 볼까요?',applicationPreview()+gated('로그인 후 신청서를 작성할 수 있습니다.'));
 const p=selected,s=state(p);
 if(ownActive(p)||s.reason)return page('RESERVATION','예약 신청서','<div class="panel"><p>'+(ownActive(p)?'이미 신청한 프로그램입니다.':s.reason)+'</p>'+link(2,'상세로 돌아가기')+'</div>');
 return page('RESERVATION','책과의 만남, 신청해 볼까요?',steps()+'<div class="application-layout"><form class="application-form" id="reading-application" novalidate><div class="form-section-heading"><h2>신청자 정보</h2><span>필수 항목 *</span></div><label class="field">신청자 이름 *<input name="name" value="'+escape(profile.name)+'" maxlength="40" required aria-describedby="name-error" placeholder="이름을 입력해 주세요"></label><p class="error" id="name-error" role="alert"></p><label class="field">휴대전화 *<input name="phone" value="'+escape(profile.phone)+'" inputmode="numeric" maxlength="11" required pattern="010[0-9]{8}" aria-describedby="phone-error phone-help" placeholder="01000000000"></label><p class="field-help" id="phone-help">010으로 시작하는 숫자 11자리를 입력해 주세요.</p><p class="error" id="phone-error" role="alert"></p><label class="field">이메일 *<input name="email" type="email" value="'+escape(profile.email)+'" maxlength="100" required aria-describedby="email-error" placeholder="reader@example.test"></label><p class="error" id="email-error" role="alert"></p><div class="participation-count"><strong>참여 인원</strong><p>본인 1명</p></div><section class="application-policy"><h2>신청 전 확인해 주세요</h2><ul><li>행사 시작 전까지 예약을 취소할 수 있어요.</li><li>같은 프로그램은 중복 신청할 수 없어요.</li></ul></section><section class="consent-panel"><h3>개인정보 수집·이용 동의</h3><p>수집 항목: 이름·연락처·이메일<br>이용 목적: 프로그램 예약 접수와 참여 안내<br>보유 기간: 운영 정책 확정 후 안내</p><label class="check"><input type="checkbox" name="agree" required aria-describedby="agree-error"> 개인정보 수집·이용 내용을 확인하고 동의합니다. (필수)</label><p class="error" id="agree-error" role="alert"></p></section><p class="info-box">아래 버튼을 누르면 신청 내용을 한 번 더 확인할 수 있어요.</p><p class="error" id="submit-error" role="alert"></p><div class="form-actions">'+link(2,'이전으로')+'<button class="button primary">제출 내용 확인</button></div><p class="form-help">신청이 어려우신가요? '+link(11,'자주 묻는 질문','text-link')+'</p></form><aside class="application-summary"><h2>신청할 프로그램</h2>'+poster(p)+'<h3>'+p.name+'</h3><span class="chip">'+p.type+'</span>'+details([['일시',timeLabel(s.start)],['장소',p.place],['참가비','무료'],['참여 인원','1명']])+link(2,'프로그램 상세 보기','text-link')+'</aside></div>');
}
const programFor=b=>programs.find(p=>p.key===b?.key);
function receipt(b){
 const p=programFor(b);
 return details([['접수번호',b.ref],['신청자',b.name],['프로그램',p.name],['일시',sessions(p).map(session=>timeLabel(session.start)).join(' / ')],['장소',p.place],['연락처',b.phone||'미입력'],['이메일',b.email||'미입력'],['예약 상태',b.cancelled?'취소':'예약 완료'],...(b.cancelledAt?[['취소일',dateLabel(new Date(b.cancelledAt))]]:[])]);
}
function completion(){
 if(!signedIn||!programFor(selectedBooking))return page('RESERVATION','신청 내역 확인',`${empty('확인할 신청 내역이 없습니다. 프로그램을 선택해 신청해 주세요.')}${link(1,'프로그램 찾아보기','button primary')}`);
 return page('RESERVATION','예약 신청이 완료되었습니다',completionBody(selectedBooking));
}
function myList(){
 if(!signedIn)return page('MY RESERVATIONS','나의 예약 내역',gated('로그인 후 나의 예약을 확인할 수 있습니다.'));
 const items=bookings.filter(b=>programFor(b)&&(!myStatus||(myStatus==='cancelled'?b.cancelled:!b.cancelled))&&(!myFrom||localDate(state(programFor(b)).start)>=myFrom)&&(!myTo||localDate(state(programFor(b)).start)<=myTo));
 const upcoming=bookings.filter(b=>programFor(b)&&!b.cancelled&&state(programFor(b)).start>new Date()).sort((a,b)=>state(programFor(a)).start-state(programFor(b)).start)[0];
 const feature=upcoming?'<section class="next-meeting"><span class="meeting-symbol" aria-hidden="true">'+window.ShyuConsumerUI.bookMark+'</span><div><p>가장 가까운 만남</p><h2>'+dateLabel(state(programFor(upcoming)).start)+', '+programFor(upcoming).place+'에서 만나요</h2><span>'+programFor(upcoming).name+' · 14:00–16:00</span></div><a class="button" href="#'+id(7)+'" data-booking="'+upcoming.ref+'">예약 상세 보기</a></section>':'';
 const list=items.length?'<div class="reservation-list">'+[...items].reverse().map(b=>{const p=programFor(b),ended=state(p).progress==='종료';return '<article class="reservation-row">'+poster(p)+'<div><span class="chip '+(b.cancelled?'closed':'open')+'">'+(b.cancelled?'취소':ended?'행사 종료 · 예약 완료':'예약 완료')+'</span><h2><a href="#'+id(7)+'" data-booking="'+b.ref+'">'+p.name+'</a></h2><p>'+timeLabel(state(p).start)+' ~ 16:00</p><p>'+p.place+'</p><p class="reservation-meta">예약번호 '+escape(b.ref)+' · 신청일 '+dateLabel(new Date(b.created))+'</p>'+(b.cancelledAt?'<p class="reservation-meta">취소일 '+dateLabel(new Date(b.cancelledAt))+'</p>':'')+'</div><div class="reservation-actions"><a class="button" href="#'+id(7)+'" data-booking="'+b.ref+'">예약 상세</a>'+(reviewEligible(b)?'<a class="button primary" href="#'+id(reviewWritten(b)?23:12)+'" data-review-booking="'+b.ref+'">'+(reviewWritten(b)?'작성한 후기 보기':'이용 후기 작성')+'</a>':'')+'</div></article>';}).join('')+'</div>':empty('조건에 맞는 예약이 없습니다.');
 return page('MY RESERVATIONS','나의 예약 내역',feature+'<form id="my-filter" class="my-filters"><label class="field">행사 시작일<input type="date" name="from" value="'+myFrom+'"></label><label class="field">행사 종료일<input type="date" name="to" value="'+myTo+'"></label><label class="field">예약 상태<select name="status"><option value="">전체</option><option value="active" '+(myStatus==='active'?'selected':'')+'>예약 완료</option><option value="cancelled" '+(myStatus==='cancelled'?'selected':'')+'>취소</option></select></label><button class="button primary">조회</button><button class="button" type="button" data-action="my-reset">초기화</button></form><p class="list-summary">예약 <strong>'+items.length+'건</strong></p>'+list+'<p class="info-box">예약 취소는 행사 시작 전까지 예약 상세에서 할 수 있어요.</p><div class="next-program"><div><h2>다음에는 어떤 책으로 만날까요?</h2><p>책이음에서 새로운 만남을 찾아보세요.</p></div>'+link(1,'새로운 프로그램 찾기','button')+'</div>');
}
const canCancel=b=>Boolean(programFor(b)&&!b.cancelled&&new Date()<state(programFor(b)).start);
function bookingDetail(){
 const b=selectedBooking;
 if(!signedIn||!programFor(b))return page('MY RESERVATIONS','예약 상세',`${empty('표시할 예약을 선택해 주세요.')}${link(6,'내 예약 보기')}`);
 return page('MY RESERVATIONS','예약 상세',`<div class="panel"><span class="chip ${b.cancelled?'closed':'open'}">${b.cancelled?'취소':'예약 완료'}</span>${receipt(b)}<p>행사 시작 전까지 취소할 수 있습니다. 접수 중이고 자리가 남아 있으면 다시 신청할 수 있습니다.</p>${!b.cancelled&&!canCancel(b)?'<p class="info-box">행사가 시작되어 예약을 취소할 수 없습니다.</p>':''}<p id="cancel-error" class="error" role="alert"></p><div class="controls">${link(6,'내 예약 내역')}${b.cancelled?'':`<button class="button" data-action="cancel" ${canCancel(b)?'':'disabled'}>예약 취소</button>`}${reviewEligible(b)?'<a class="button" href="#'+id(reviewWritten(b)?23:12)+'" data-review-booking="'+b.ref+'">'+(reviewWritten(b)?'작성한 후기 보기':'이용 후기 작성')+'</a>':''}</div></div>`);
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
 const errors={name:name?'':'신청자 이름을 입력해 주세요.',phone:/^010\d{8}$/.test(phone)?'':'010으로 시작하는 숫자 11자리를 입력해 주세요.',email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)?'':'이메일 형식을 확인해 주세요.',agree:fields.agree.checked?'':'개인정보 수집·이용 동의를 확인해 주세요.'};
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
  const created=Date.now(), b={key:p.key,name,phone,email,ref:`SH-${created.toString(36).toUpperCase()}`,created,cancelled:false};
  if(!persist([...bookings,b])){error.textContent='예약을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.';return}
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
 return all.length?all.map(r=>`<article class="review"><div class="review-meta"><strong>평점 ${r.rating} / 5</strong><span>${r.sample?'참여자':'회원'} · ${dateLabel(new Date(r.created))}</span></div><p>${escape(r.text)}</p></article>`).join(''):empty('등록된 이용 후기가 없습니다.');
}
function noticeList(){
 const items=notices.filter(n=>n.title.includes(noticeQuery)).sort((a,b)=>Number(b.important)-Number(a.important)||b.date.localeCompare(a.date));
 const visible=items.slice((noticePage-1)*2,noticePage*2);
 return page('GUIDE','공지사항',`<p class="page-intro">프로그램 예약과 서비스 이용에 필요한 소식을 안내합니다.</p><form id="notice-search" class="board-search"><label for="notice-keyword">제목 검색</label><input id="notice-keyword" name="q" value="${escape(noticeQuery)}" placeholder="검색어를 입력하세요"><button class="button primary">검색</button></form><div class="list-summary">전체 <strong>${items.length}</strong>건</div><div class="table-scroll"><table class="board-table"><thead><tr><th scope="col">번호</th><th scope="col">제목</th><th scope="col">등록일</th></tr></thead><tbody>${visible.map((n,i)=>`<tr><td>${n.important?'<span class="chip open">공지</span>':items.length-(noticePage-1)*2-i}</td><td><a href="#${id(13)}" data-notice="${n.key}">${n.title}</a></td><td>${n.date}</td></tr>`).join('')||'<tr><td colspan="3">검색 결과가 없습니다.</td></tr>'}</tbody></table></div>${items.length>2?`<nav class="pagination" aria-label="공지사항 페이지">${Array.from({length:Math.ceil(items.length/2)},(_,i)=>`<button class="button ${noticePage===i+1?'primary':''}" data-notice-page="${i+1}">${i+1}</button>`).join('')}</nav>`:''}`);
}
function noticeDetail(){
 const n=selectedNotice,index=notices.indexOf(n);
 return page('GUIDE','공지사항',`<article class="notice-article"><h2>${n.title}</h2><div class="article-meta">등록일 ${n.date} · 운영 안내</div><div class="article-body">${escape(n.body).replaceAll('\n','<br>')}</div>${n.attachment?`<p class="notice-attachment">첨부파일 <a href="${n.attachment.url}" download>${escape(n.attachment.name)}</a></p>`:''}</article><div class="bottom-actions">${index>0?`<a class="button" data-notice="${notices[index-1].key}" href="#${id(13)}">이전 글</a>`:''}${link(10,'목록으로')}${index<notices.length-1?`<a class="button" data-notice="${notices[index+1].key}" href="#${id(13)}">다음 글</a>`:''}</div>`);
}
function faq(){
 const items=questions.filter(([category,q,a])=>(!faqCategory||category===faqCategory)&&(q+a).includes(faqQuery));
 return page('GUIDE','자주묻는 질문',`<p class="page-intro">예약과 이용에 대해 궁금한 점을 확인해 보세요.</p><form id="faq-search" class="board-search"><label for="faq-category">분류</label><select id="faq-category" name="category">${['','예약','취소','후기','계정','이용'].map(c=>`<option value="${c}" ${faqCategory===c?'selected':''}>${c||'전체'}</option>`).join('')}</select><label class="sr-only" for="faq-keyword">질문 검색</label><input id="faq-keyword" name="q" value="${escape(faqQuery)}" placeholder="궁금한 내용을 입력하세요"><button class="button primary">검색</button></form><div class="faq-list">${items.map(([c,q,a])=>`<details class="faq-item"><summary><span class="question-mark">Q</span><span class="faq-category">${c}</span><span>${q}</span></summary><div class="faq-answer">${a}<p>${link(({예약:1,취소:6,후기:12,계정:25,이용:16})[c],'관련 화면 보기','text-link')}</p></div></details>`).join('')||empty('검색 결과가 없습니다.')}</div>`);
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
 if(!title||title.length>80){error.textContent='후기 제목을 1~80자로 입력해 주세요.';form.elements.title.focus();return;}
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
let profile=read(localStorage,'shyu.reading.profile',{name:'책이음 회원',email:'reader@example.test',phone:'01000000000'});
let spaceFilters={q:'',district:'',type:''}, selectedSpace=selected.key, selectedReview='', reviewQuery='',reviewType='',myStatus='',myFrom='',myTo='';
let noticePage=1, reviewPageNumber=1, editDirty=false;
const PAGE_SIZE=3;
const sampleReview={ref:'sample-review',key:programs[4].key,title:'책을 따라 동네를 새롭게 만났어요',text:'혼자 읽을 때는 지나쳤던 문장을 다른 분들과 함께 이야기하며 다시 발견했습니다. 산책과 독서를 함께 할 수 있어 좋았어요.',rating:5,created:dateAt(-1,14).getTime(),sample:true};
const allReviews=()=>[...reviews,sampleReview].sort((a,b)=>b.created-a.created);
const placeType=p=>['book-1','book-4'].includes(p.key)?'독립서점':'도서관·문화공간';
const address=p=>`서울특별시 ${p.district} 책길 ${Number(p.key.slice(-1))*12}`;
const selectedPlace=()=>programs.find(p=>p.key===selectedSpace)||programs[0];
const note=()=>'';
const exampleBooking=()=>({key:programs[0].key,name:'실습 참가자',email:'reader@example.test',ref:'SH-PREVIEW-0001',created:Date.now(),cancelled:false,preview:true});
function applicationPreview(){const p=selected,s=state(p);return `<div class="panel form-panel"><span class="chip">신청자 정보</span><h2>${p.name}</h2><p>${timeLabel(s.start)} · ${p.place}</p><fieldset disabled><label class="field">신청자 이름 (필수)<input placeholder="이름을 입력해 주세요"></label><label class="field">휴대전화 (필수)<input placeholder="01000000000"></label><label class="field">이메일 (필수)<input placeholder="reader@example.test"></label><label class="check"><input type="checkbox">신청 정보 확인 및 동의</label><button class="button primary">로그인 후 신청 가능</button></fieldset></div>`}
function completionBody(b){return `<ol class="stepper"><li>01 신청서 작성</li><li>02 내용 확인</li><li class="active">03 신청 완료</li></ol><section class="panel completion-panel"><span class="complete-icon" aria-hidden="true">✓</span><h2>${b.preview?'신청 정보를 확인해 주세요':'책과 함께할 시간이 예약되었어요'}</h2><p>행사 일정과 장소를 확인해 주세요.</p><span class="chip open">${b.cancelled?'예약 취소':'예약 완료'}</span>${receipt(b)}<div class="controls">${b.preview?link(1,'프로그램 찾아보기','button primary'):`<a class="button primary" href="#${id(7)}" data-booking="${b.ref}">예약 상세 보기</a>`}${link(6,'나의 예약 내역')}${link(1,'다른 프로그램 찾기')}</div>${note()}</section>`}
function seedDemo(){
 if(!localStorage.getItem('shyu.reading.seed.v2')){
  const seed=[{...exampleBooking(),key:programs[1].key,ref:'SH-DEMO-UPCOMING',preview:undefined},{...exampleBooking(),key:programs[4].key,ref:'SH-DEMO-COMPLETED',preview:undefined}];
  if(persist([...bookings,...seed.filter(x=>!bookings.some(b=>b.ref===x.ref))]))localStorage.setItem('shyu.reading.seed.v2','true');
 }
}
function signInDemo(){signedIn=true;sessionStorage.setItem('shyu.reading.login','true');seedDemo();if(pendingFavorite){const key=pendingFavorite;pendingFavorite='';if(!favorites.includes(key)){try{const next=[...favorites,key];localStorage.setItem(favoritesKey,JSON.stringify(next));favorites=next;}catch{}}}go(returnTo||14)}
function favoriteList(){if(!signedIn)return page('MY PAGE','찜한 프로그램',gated('로그인 후 찜한 프로그램을 확인할 수 있습니다.'));const items=programs.filter(p=>favorites.includes(p.key));return page('MY PAGE','찜한 프로그램','<p class="list-summary">찜한 프로그램 <strong>'+items.length+'건</strong></p>'+(items.length?'<div class="favorite-list">'+items.map(p=>'<section>'+card(p)+'<button class="button favorite-button" data-favorite="'+p.key+'" aria-label="'+p.name+' 찜 해제">찜 해제</button></section>').join('')+'</div>':empty('찜한 프로그램이 없습니다. 관심 있는 프로그램을 찾아보세요.'))+link(1,'프로그램 찾기','button primary')+'<p id="favorite-status" role="status"></p>');}
function spaceSearch(){return `<form id="space-search" class="space-discovery-search controls"><label class="field">공간명<input name="q" value="${escape(spaceFilters.q)}" placeholder="도서관, 책방 이름"></label><label class="field">지역<select name="district">${['',...districts].map(v=>`<option ${v===spaceFilters.district?'selected':''} value="${v}">${v||'전체 지역'}</option>`).join('')}</select></label><label class="field">공간 유형<select name="type">${['','독립서점','도서관·문화공간'].map(v=>`<option ${v===spaceFilters.type?'selected':''}>${v||'전체'}</option>`).join('')}</select></label><button class="button primary">검색</button><button type="button" class="button" data-action="space-reset">초기화</button></form>`}
function spacesView(map=false){
 const items=programs.filter(p=>(p.place.includes(spaceFilters.q))&&(!spaceFilters.district||p.district===spaceFilters.district)&&(!spaceFilters.type||placeType(p)===spaceFilters.type));
 const body=items.length?items.map(p=>`<article class="panel space-card">${photo(p,'space-art')}<div><span class="chip">${placeType(p)}</span><h2><a data-space="${p.key}" href="#${id(18)}">${p.place}</a></h2><p>${address(p)}</p><p class="muted">동네에서 책과 사람을 만나는 공간 · 진행 프로그램 ${state(p).progress==='종료'?0:1}개</p><a class="text-link" data-space="${p.key}" href="#${id(18)}">공간 살펴보기 →</a></div></article>`).join(''):empty('조건에 맞는 공간이 없습니다. 검색 조건을 변경해 주세요.');
 const mapHtml=`<section class="map-panel"><div class="map-heading"><div><p class="eyebrow">READING SPACES IN SEOUL</p><h2>프로그램이 열리는 독서 공간</h2></div><span class="chip">${items.length}개 공간</span></div><button type="button" class="button" data-action="locate">내 위치 주변 보기</button><p id="location-status" role="status"></p><div id="reading-map" class="live-map" aria-label="독서 프로그램 장소 지도"></div><p id="map-status" class="muted map-notice" role="status"></p></section>`;

 return page('READING SPACES',map?'지도로 만나는 독서 공간':'우리 동네 독서 공간',`<p class="page-intro space-intro">가까운 책방과 도서관에서 새로운 만남을 발견해 보세요.</p>${spaceSearch()}<div class="result-heading"><p>전체 <strong>${items.length}</strong>개 공간</p><div class="controls">${link(17,'목록',map?'button':'button primary')}${link(8,'지도',map?'button primary':'button')}</div></div>${map?mapHtml:''}<div class="stack">${body}</div>`);
}
function spaceDetail(){const p=selectedPlace();return page('READING SPACES',p.place,`${link(17,'← 공간 목록','back')}<div class="columns"><section class="panel">${spaceGallery(p)}<h2>책이 있는 동네의 쉼표</h2><p>읽고, 쓰고, 함께 이야기하는 독서 문화공간입니다. 책에 관심 있는 누구나 프로그램을 통해 새로운 이야기를 만날 수 있습니다.</p>${details([['공간 유형',placeType(p)],['주소',address(p)],['운영시간','화–일 10:00–18:00'],['문의','contact@example.test'],['오시는 길',`${p.district} 소재 · 상세 교통편은 운영 시 등록`]])}${link(8,'공간 지도 보기')}</section><section><h2>이 공간의 프로그램</h2>${cards(programs.filter(x=>x.key===p.key))}</section></div>`)}
function spaceGallery(p){const images=[p.spaceImage,...spaceImages.filter(image=>image.file!==p.spaceImage.file)].filter((image,i,all)=>all.findIndex(x=>x.file===image.file)===i).slice(0,4);galleryIndex=(galleryIndex+images.length)%images.length;const image=images[galleryIndex];return '<section class="space-gallery" aria-label="'+p.place+' 사진"><div class="gallery-viewport"><img src="assets/images/'+image.file+'" alt="'+image.alt+'" style="object-position:'+image.position+'"></div>'+(images.length>1?'<div class="gallery-controls"><button class="button" data-gallery="-1" aria-label="이전 공간 사진">이전 사진</button><span role="status">'+(galleryIndex+1)+' / '+images.length+'</span><button class="button" data-gallery="1" aria-label="다음 공간 사진">다음 사진</button></div>':'')+'</section>';}
function reviewItem(r,own=false){const p=programFor(r);return `<article class="panel"><span class="chip">${p?.type||'독서 프로그램'}</span><h2><a href="#${id(20)}" data-review="${r.ref}">${escape(r.title||'함께 나눈 독서의 기억')}</a></h2><p class="muted">${escape(p?.name||'프로그램')} · ${r.sample?'독서하는 이**':'회원'} · ${dateLabel(new Date(r.created))}</p><p>${escape(r.text.slice(0,110))}</p>${own?`<div class="controls"><a class="button" href="#${id(24)}" data-review="${r.ref}">수정</a><button class="button" data-delete-review="${r.ref}">삭제</button><span class="chip">공개</span></div>`:''}</article>`}
function pagination(count,current,key,size=PAGE_SIZE){const pages=Math.ceil(count/size);return pages>1?`<nav class="pagination" aria-label="페이지 이동">${Array.from({length:pages},(_,i)=>`<button class="button ${current===i+1?'primary':''}" data-${key}-page="${i+1}" ${current===i+1?'aria-current="page"':''}>${i+1}</button>`).join('')}</nav>`:''}
function publicReviews(){const items=allReviews().filter(r=>`${r.title||''} ${programFor(r)?.name}`.includes(reviewQuery)&&(!reviewType||programFor(r)?.type===reviewType));return page('READERS’ STORIES','책으로 이어진 이야기',`<p class="page-intro">함께 읽고 나눈 사람들의 경험을 만나보세요.</p><form id="public-review-search" class="board-search"><label>프로그램 유형<select name="type">${['',...types].map(t=>`<option value="${t}" ${reviewType===t?'selected':''}>${t||'전체'}</option>`).join('')}</select></label><label class="field">후기·프로그램 검색<input name="q" value="${escape(reviewQuery)}" placeholder="제목 또는 프로그램명"></label><button class="button primary">검색</button></form><p>전체 <strong>${items.length}</strong>건 · 최신순</p><div class="stack">${items.slice((reviewPageNumber-1)*PAGE_SIZE,reviewPageNumber*PAGE_SIZE).map(r=>reviewItem(r)).join('')||empty('검색 결과가 없습니다.')}</div>${pagination(items.length,reviewPageNumber,'review')}`)}
function publicReviewDetail(){const r=allReviews().find(r=>r.ref===selectedReview)||(!selectedReview?sampleReview:null);if(!r)return page('READERS’ STORIES','후기를 찾을 수 없습니다',link(19,'후기 목록'));return page('READERS’ STORIES','이용 후기',`<article class="panel article-body"><h2>${escape(r.title||'함께 나눈 독서의 기억')}</h2><p class="muted">${dateLabel(new Date(r.created))} · 회원</p><p>${escape(r.text)}</p>${canView(programFor(r))?`<a class="text-link" href="#${id(2)}" data-program="${r.key}">관련 프로그램 보기</a>`:'<p class="muted">'+state(programFor(r)).status+' · '+state(programFor(r)).progress+' 프로그램입니다. 현재 상세 조회가 불가합니다.</p>'}</article><div class="controls">${link(19,'목록으로')}${signedIn&&!r.sample?`<a class="button" href="#${id(24)}" data-review="${r.ref}">수정</a><button class="button" data-delete-review="${r.ref}">삭제</button>`:''}</div>`)}
function myReviews(){return page('MY PAGE','나의 후기',!signedIn?gated('로그인 후 작성한 후기를 확인할 수 있습니다.'):`<p class="page-intro">책과 함께한 나의 기록을 모았습니다.</p><div class="stack">${reviews.map(r=>reviewItem(r,true)).join('')||empty('아직 작성한 후기가 없습니다.')}</div><div class="bottom-actions">${link(12,'후기 작성하기','button primary')}</div>`)}
function editReview(){if(!signedIn)return page('MY PAGE','후기 수정',gated('로그인 후 본인의 후기를 수정할 수 있습니다.'));const r=reviews.find(r=>r.ref===selectedReview);if(!r)return page('MY PAGE','후기 수정',`${empty('수정할 후기를 선택해 주세요.')}${link(23,'나의 후기 목록')}`);return page('MY PAGE','후기 수정',`<form id="edit-review" class="panel form-panel" novalidate><h2>${programFor(r)?.name}</h2><label class="field">후기 제목<input name="title" maxlength="80" value="${escape(r.title||'함께 나눈 독서의 기억')}"></label><label class="field">후기 내용<textarea name="body" rows="8" maxlength="1000">${escape(r.text)}</textarea></label><p class="muted">10~1,000자 · 개인정보를 입력하지 마세요.</p><p id="edit-error" class="error" role="alert"></p><div class="controls"><button class="button primary">수정 내용 저장</button>${link(23,'취소')}</div></form>`)}
function field(label,name,type='text',value='',placeholder=''){return `<label class="field">${label}<input name="${name}" type="${type}" value="${escape(value)}" placeholder="${placeholder}" autocomplete="off" required maxlength="100"></label>`}
function memberForm(kind){
 const labels={signup:'회원가입',recover:'계정 찾기',profile:'회원정보 조회·수정',password:'비밀번호 변경',withdraw:'회원 탈퇴'};
 if(['profile','password','withdraw'].includes(kind)&&!signedIn)return page('MY PAGE',labels[kind],gated('로그인 후 이용할 수 있습니다.'));
 if(['signup','recover'].includes(kind)&&signedIn)return page('ACCOUNT',labels[kind],`<div class="panel"><p>이미 로그인되어 있습니다.</p>${link(25,'내 정보 확인')}${link(28,'로그아웃')}</div>`);
 const fields=kind==='signup'?`${field('아이디','account')}${field('이름','name')}${field('이메일','email','email')}${field('비밀번호 (영문·숫자 포함 8자 이상)','password','password')}${field('비밀번호 확인','confirm','password')}<label class="check"><input name="agree" type="checkbox">이용약관 및 개인정보 수집·이용 동의 (필수)</label><label class="check"><input name="marketing" type="checkbox">프로그램 소식 받기 (선택)</label>`:
 kind==='recover'?`<label class="field">찾을 항목<select name="mode"><option value="id">아이디 찾기</option><option value="password">비밀번호 재설정</option></select></label>${field('가입 시 이름','name')}${field('가입 시 이메일','email','email')}<label class="check"><input type="checkbox" name="verify">입력한 이름과 이메일을 확인했습니다</label>${field('재설정할 새 비밀번호 (재설정 선택 시)','password','password')}${field('새 비밀번호 확인','confirm','password')}`:
 kind==='profile'?`<p class="muted">회원 ID: study-reader · 변경할 수 없습니다.</p>${field('이름','name','text',profile.name)}${field('연락처','phone','tel',profile.phone)}${field('이메일','email','email',profile.email)}<label class="check"><input type="checkbox" name="verify">변경할 정보를 확인했습니다</label>`:
 kind==='password'?`${field('현재 비밀번호','current','password')}${field('새 비밀번호 (영문·숫자 포함 8자 이상)','password','password')}${field('새 비밀번호 확인','confirm','password')}<p class="muted">현재 비밀번호와 새 비밀번호를 입력해 주세요.</p>`:
 `<div class="info-box">탈퇴 시 이용이 제한됩니다. 진행 예정인 예약이 있다면 먼저 취소해 주세요.</div><label class="check"><input type="checkbox" name="verify">탈퇴할 정보를 확인했습니다</label><label class="check"><input type="checkbox" name="agree">위 내용을 확인했으며 회원 탈퇴에 동의합니다.</label>`;
 return page(['profile','password','withdraw'].includes(kind)?'MY PAGE':'ACCOUNT',labels[kind],`<form class="panel form-panel" id="member-${kind}" novalidate><h2>${labels[kind]}</h2>${kind==='signup'?'<ol class="signup-steps"><li>약관 확인</li><li>정보 입력</li><li>가입 정보 확인</li></ol>':''}${fields}<p class="error" id="member-error" role="alert"></p><p id="member-result" class="success-message" role="status" hidden></p><div class="controls"><button class="button primary">${kind==='recover'?'결과 확인':kind==='withdraw'?'탈퇴 신청':kind==='signup'?'가입하기':'변경 내용 저장'}</button>${link(kind==='signup'||kind==='recover'?3:6,'돌아가기')}</div>${kind==='profile'?`<div class="account-links">${link(26,'비밀번호 변경','text-link')}${link(27,'회원 탈퇴','text-link')}</div>`:''}</form>`);
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
 if(kind==='signup'&&['admin','study-reader'].includes(v.account))return fail('이미 사용 중인 아이디입니다.','account');
 if(kind==='password'&&!v.current)return fail('현재 비밀번호를 입력해 주세요.','current');
 if((['signup','password'].includes(kind)||(kind==='recover'&&v.mode==='password'))&&(!validPass(v.password)||v.password!==v.confirm))return fail('새 비밀번호는 영문·숫자 8자 이상이며 확인값이 같아야 합니다.','password');
 if(kind==='password'&&v.current===v.password)return fail('다른 새 비밀번호를 입력해 주세요.','password');
 if(['signup','withdraw'].includes(kind)&&!v.agree)return fail('필수 동의를 확인해 주세요.','agree');
 if(['profile','recover','withdraw'].includes(kind)&&!v.verify)return fail('입력 정보 확인 항목을 선택해 주세요.','verify');
 if(kind==='withdraw'){
  if(bookings.some(b=>!b.cancelled&&state(programFor(b)).progress!=='종료'))return fail('진행 예정 또는 진행 중인 예약을 먼저 취소해 주세요.');
  return popup(`${id(27)}-p01`,'회원 탈퇴 확인','회원 탈퇴를 진행할까요?',()=>{try{[bookingsKey,reviewsKey,'shyu.reading.profile','shyu.reading.seed.v2',favoritesKey].forEach(k=>localStorage.removeItem(k));bookings=[];reviews=[];favorites=[];profile={name:'책이음 회원',email:'reader@example.test',phone:'01000000000'};signedIn=false;sessionStorage.removeItem('shyu.reading.login');go(14)}catch{fail('탈퇴를 처리하지 못했습니다.')}},'탈퇴 및 삭제');
 }
 if(kind==='profile'){try{const next={name:v.name.trim(),phone:v.phone,email:v.email};localStorage.setItem('shyu.reading.profile',JSON.stringify(next));profile=next}catch{return fail('변경 내용을 저장하지 못했습니다.')}}
 result.hidden=false;result.textContent=kind==='signup'?'입력 정보를 확인했습니다. 로그인 화면에서 계속해 주세요.':kind==='recover'?(v.mode==='id'?'아이디: study-reader':'새 비밀번호의 입력 형식을 확인했습니다.'):kind==='password'?'새 비밀번호의 입력 형식을 확인했습니다.':'회원정보를 저장했습니다.';
 form.querySelectorAll('input[type=password]').forEach(x=>x.value='');editDirty=false;
}
function logoutView(){if(signedIn){signedIn=false;sessionStorage.removeItem('shyu.reading.login');selectedBooking=null;}return page('ACCOUNT','로그아웃되었습니다',`<section class="panel"><p>다음 책과의 만남에서 다시 만나요.</p><div class="controls">${link(14,'홈으로','button primary')}${link(3,'로그인')}</div></section>`)}

const {home,introduction,usage}=window.createShyuViews({hero,page,link,cards,programs,state,notices,id,types,note,poster,photo,dateLabel,timeLabel,sessions});

const specs=[
 ['apply-confirm',4,'예약 신청 확인','레이어 컨펌','필수 입력값이 유효한 상태에서 제출 내용 확인 선택','입력한 정보로 예약을 신청할까요?','접수 조건을 재확인하고 저장 성공 시 신청 완료 화면으로 이동','신청서 입력을 유지합니다.'],
 ['cancel-confirm',7,'예약 취소 확인','레이어 컨펌','행사 시작 전 예약 취소 선택','이 예약을 취소할까요?','취소를 저장하고 예약 상세 및 목록에 상태를 반영','현재 예약 상태를 유지합니다.'],
 ['phone-format',4,'휴대전화 형식','인라인 오류','휴대전화가 010으로 시작하는 숫자 11자리가 아닐 때','010으로 시작하는 숫자 11자리를 입력해 주세요.','신청서에 머물며 오류 항목으로 이동','']
];
specs.push(['review-confirm',12,'후기 등록 확인','레이어 컨펌','평점과 후기 검증을 통과한 뒤 등록 선택','작성한 이용 후기를 등록할까요?','저장 후 작성 결과 표시','입력 내용 유지']);
window.GFAIR_MESSAGE_SPECS=specs.map(([key,n,title,type,trigger,message,confirm,cancel])=>({key,screens:[id(n)],title,type,trigger,message,confirm,cancel}));
function draw(){
 signedIn=read(sessionStorage,'shyu.reading.login',false);
 let hash=location.hash.slice(1);
 const legacy=/^SH-LIB-(\d{2})$/.exec(hash);
 if(legacy&&Number(legacy[1])<=13){hash=id(Number(legacy[1]));history.replaceState(null,'',`#${hash}`)}
 const compatible=compatibleId(hash);if(compatible!==hash){hash=compatible;history.replaceState(null,'',`#${hash}`)}
 const index=screens.findIndex(s=>s.id===hash),n=index<0?14:index+1;
 if(!hash){hash=id(14);history.replaceState(null,'',`#${hash}`)}
 document.body.dataset.screen=hash;
 document.querySelector('#account-link').textContent=signedIn?'로그아웃':'로그인';
 const currentGroup=n===9?'calendar':[19,20].includes(n)?'review':[1,2,4,5].includes(n)?'program':'';
 document.querySelectorAll('[data-nav]').forEach(a=>a.setAttribute('aria-current',a.dataset.nav===currentGroup?'page':'false'));
 document.title=`${hash==='screens'?'화면검색':screens[n-1].title} · 책이음`;
 if(hash==='screens'){
  const items=screens.filter(s=>`${s.id} ${s.title}`.toLowerCase().includes(search.toLowerCase()));
  content.innerHTML=page('SCREEN INDEX','화면검색',`<form id="reading-screen-search" class="controls"><label>화면 ID 또는 이름 <input name="q" value="${escape(search)}"></label><button class="button">검색</button></form><ul>${items.map(s=>`<li><a href="#${s.id}">${s.id} · ${s.title}</a></li>`).join('')}</ul>${items.length?'':empty('검색 결과가 없습니다.')}`);
  return;
 }
 window.ShyuMap?.unmount();
 content.innerHTML=[()=>explore(1),detail,login,application,completion,myList,bookingDetail,()=>spacesView(true),()=>explore(9),noticeList,faq,reviewPage,noticeDetail,home,introduction,usage,()=>spacesView(false),spaceDetail,publicReviews,publicReviewDetail,()=>memberForm('signup'),()=>memberForm('recover'),myReviews,editReview,()=>memberForm('profile'),()=>memberForm('password'),()=>memberForm('withdraw'),logoutView,favoriteList][n-1]();
 document.querySelector('#account-link').textContent=signedIn?'로그아웃':'로그인';
 if(n===8){const items=programs.filter(p=>p.place.includes(spaceFilters.q)&&(!spaceFilters.district||p.district===spaceFilters.district)&&(!spaceFilters.type||placeType(p)===spaceFilters.type));window.ShyuMap?.mount(document.getElementById('reading-map'),items,selectedSpace,key=>{selectedSpace=key;go(18)});}

 if(n===12){const form=content.querySelector('#reading-review');form?.querySelector('label:nth-of-type(2)')?.insertAdjacentHTML('beforebegin',field('후기 제목 (필수)','title'));}

}
content.addEventListener('change',event=>{if(event.target.id==='program-page-size'){programPageSize=Number(event.target.value);programPage=1;draw();content.querySelector('#program-page-size')?.focus();return;}if(event.target.matches('#reading-filters input[name=type]')){filters=Object.fromEntries(new FormData(event.target.form));programPage=1;draw();content.querySelector('input[name=type]:checked')?.focus();}});
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
  if(!title||title.length>80||text.length<10||text.length>1000){error.textContent='제목과 10~1,000자의 후기를 입력해 주세요.';return}
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
 if(control.dataset.scroll){document.getElementById(control.dataset.scroll)?.scrollIntoView({behavior:'smooth',block:'start'});return;}
 if(control.dataset.gallery){galleryIndex+=Number(control.dataset.gallery);draw();content.querySelector('[data-gallery="'+control.dataset.gallery+'"]')?.focus({preventScroll:true});return;}
 if(control.dataset.favorite){event.preventDefault();const key=control.dataset.favorite;if(!signedIn){selected=programs.find(p=>p.key===key)||selected;pendingFavorite=key;returnTo=2;go(3);return;}const next=favorites.includes(key)?favorites.filter(x=>x!==key):[...favorites,key];try{localStorage.setItem(favoritesKey,JSON.stringify(next));favorites=next;draw();const message=content.querySelector('#favorite-status');if(message)message.textContent='찜한 프로그램에서 해제했습니다.';}catch{control.insertAdjacentHTML('afterend','<p class="error" role="alert">찜 상태를 저장하지 못했습니다. 다시 시도해 주세요.</p>');}return;}
 if(action==='demo-login'){signInDemo();return}
 if(action==='space-reset'){spaceFilters={q:'',type:'',district:''};draw()}
 if(action==='my-reset'){myStatus='';myFrom='';myTo='';draw()}
 if(action==='locate'){window.ShyuMap?.locate();return;}
 if(action==='today'){month=new Date(now.getFullYear(),now.getMonth(),1);chosenDate=dateKey(now);draw()}
 if(control.dataset.space){galleryIndex=0;selectedSpace=control.dataset.space;if(location.hash===`#${id(18)}`)draw()}
 if(control.dataset.spacePin){selectedSpace=control.dataset.spacePin;draw()}
 if(control.dataset.review){selectedReview=control.dataset.review;if(location.hash===`#${id(20)}`||location.hash===`#${id(24)}`)draw()}
 if(control.dataset.reviewBooking){reviewRef=control.dataset.reviewBooking}
 if(control.dataset.calendarDate){chosenDate=control.dataset.calendarDate;const [y,m]=chosenDate.split('/').map(Number);month=new Date(y,m-1,1);}
 if(control.dataset.programPage){programPage=Number(control.dataset.programPage);draw()}
 if(control.dataset.reviewPage){reviewPageNumber=Number(control.dataset.reviewPage);draw()}
 if(control.dataset.noticePage){noticePage=Number(control.dataset.noticePage);draw()}
 if(control.dataset.deleteReview&&signedIn){const ref=control.dataset.deleteReview;popup(`${location.hash.slice(1)}-p01`,'후기 삭제 확인','이 후기를 삭제할까요? 삭제한 후기는 복구할 수 없습니다.',()=>{const error=()=>{control.insertAdjacentHTML('afterend','<p class="error" role="alert">삭제 내용을 저장하지 못했습니다.</p>')};try{const next=reviews.filter(r=>r.ref!==ref);localStorage.setItem(reviewsKey,JSON.stringify(next));reviews=next;editDirty=false;go(23)}catch{error()}},'삭제')}
 if(notice){selectedNotice=notices.find(n=>n.key===notice)||notices[0];sessionStorage.setItem('shyu.reading.notice',selectedNotice.key);if(location.hash===`#${id(13)}`)draw();}
 if(status!==undefined){filters.status=status;draw();content.querySelector(`[data-status="${status}"]`)?.focus();}
 if(program){const target=programs.find(p=>p.key===program);if(!target||!canView(target)){event.preventDefault();return;}selected=target;sessionStorage.setItem("shyu.reading.program",program);if(location.hash===`#${id(2)}`)draw()}
 if(booking){selectedBooking=bookings.find(b=>b.ref===booking);sessionStorage.setItem("shyu.reading.booking",booking);if(location.hash===`#${id(7)}`)draw()}
 if(pin){pinKey=pin;draw();content.querySelector(`[data-pin="${pin}"]`)?.focus()}
 if(day){chosenDate=day;draw();content.querySelector(`[data-day="${day}"]`)?.focus()}
 if(monthStep){month=new Date(month.getFullYear(),month.getMonth()+Number(monthStep),1);chosenDate='';draw();content.querySelector(`[data-month="${monthStep}"]`)?.focus()}
 if(action==='reset'){filters={q:'',type:'',district:'',progress:'',status:'',date:'',sort:'event'};programPage=1;pinKey='';draw();content.querySelector('[data-action=reset]').focus()}
 if(action==='apply'){returnTo=4;go(signedIn?4:3)}
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
document.querySelector('.site-footer').addEventListener('click',event=>{
 const key=event.target.closest('[data-footer-policy]')?.dataset.footerPolicy;if(!key)return;
 const privacy=key==='privacy';dialog.dataset.screenId=id(14)+(privacy?'-p04':'-p03');
 dialog.innerHTML='<div class="dialog-title"><h2 id="reservation-dialog-title">'+(privacy?'개인정보처리방침':'이용약관')+'</h2><button type="button" data-close aria-label="안내 팝업 닫기">×</button></div><p>'+(privacy?'개인정보처리방침을 준비하고 있습니다.':'이용약관을 준비하고 있습니다. 예약과 취소 방법은 이용 안내에서 확인해 주세요.')+'</p><button type="button" class="primary" data-close>확인</button>';
 dialog.querySelectorAll('[data-close]').forEach(b=>b.onclick=()=>dialog.close());dialog.showModal();
});
let galleryStart=null;
content.addEventListener('pointerdown',e=>{if(e.target.closest('.gallery-viewport'))galleryStart=e.clientX;});
content.addEventListener('pointerup',e=>{if(galleryStart!==null&&e.target.closest('.gallery-viewport')&&Math.abs(e.clientX-galleryStart)>45){galleryIndex+=e.clientX<galleryStart?1:-1;draw();}galleryStart=null;});
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
