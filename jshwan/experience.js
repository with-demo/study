/* Search continuity, shareable conditions, city shortlists and compact filters. */
const EXPERIENCE_KEY='whever-experience-v1';
const FLIGHT_FILTER_DEFAULTS={direct:false,carrier:'all',baggage:false,sort:'price',budget:10000000,maxDuration:1000};
const PLACE_FILTER_DEFAULTS={category:'all',area:'all',travel:999,duration:'all',cost:'all'};
let experienceRendering=false,experienceReady=false,experienceTimer,experienceDefaults;
let lastRouteHash='',nextScroll=0;

function validDateValue(value){
 if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
 const parsed=new Date(value+'T12:00:00');return !Number.isNaN(parsed.valueOf())&&localDate(parsed)===value;
}
function sanitizedExperience(raw,defaults){
 const clean=JSON.parse(JSON.stringify(defaults));
 if(!raw||typeof raw!=='object')return clean;
 const q=raw.query||{},f=raw.filters||{},p=raw.placeFilters||{};
 const choose=(value,allowed,fallback)=>allowed.includes(value)?value:fallback;
 const integer=(value,min,max,fallback)=>Number.isInteger(value)&&value>=min&&value<=max?value:fallback;
 clean.query.origin=choose(q.origin,['ICN','PUS','GMP'],clean.query.origin);
 clean.query.destination=choose(q.destination,['ANY',...CITIES.map(c=>c.id)],clean.query.destination);
 clean.query.trip=choose(q.trip,['round','one'],clean.query.trip);
 clean.query.mode=choose(q.mode,['exact','flex'],clean.query.mode);
 clean.query.cabin=choose(q.cabin,['economy','premium','business','first'],clean.query.cabin);
 for(const key of ['depart','back','rangeStart','rangeEnd'])if(validDateValue(q[key]))clean.query[key]=q[key];
 for(const key of ['adults','children','infants'])clean.query[key]=integer(q[key],key==='adults'?1:0,9,clean.query[key]);
 for(const key of ['stay','stayMax'])clean.query[key]=integer(q[key],1,30,clean.query[key]);
 for(const key of ['weekday','returnDay'])clean.query[key]=choose(q[key],['all','weekday','weekend','0','1','2','3','4','5','6'],clean.query[key]);
 clean.query.weekend=q.weekend===true;
 if(clean.query.depart<today){clean.query.depart=defaults.query.depart;clean.query.back=defaults.query.back;}
 if(clean.query.back<clean.query.depart)clean.query.back=addDays(clean.query.depart,3);
 if(clean.query.rangeStart<today){clean.query.rangeStart=defaults.query.rangeStart;clean.query.rangeEnd=defaults.query.rangeEnd;}
 if(clean.query.rangeEnd<clean.query.rangeStart||nights(clean.query.rangeStart,clean.query.rangeEnd)>89)clean.query.rangeEnd=addDays(clean.query.rangeStart,30);
 if(clean.query.stayMax<clean.query.stay)clean.query.stayMax=clean.query.stay;
 if(clean.query.children+clean.query.adults>9)clean.query.children=9-clean.query.adults;
 clean.query.infants=Math.min(clean.query.infants,clean.query.adults);
 if(city(clean.query.destination)?.airport===clean.query.origin)clean.query.destination='ANY';
 clean.filters.direct=f.direct===true;clean.filters.baggage=f.baggage===true;
 clean.filters.carrier=choose(f.carrier,['all',...CARRIERS],'all');
 clean.filters.sort=choose(f.sort,['price','minutes','departure'],'price');
 clean.filters.budget=choose(f.budget,[100000,300000,500000,1000000,2000000,10000000],10000000);
 clean.filters.maxDuration=choose(f.maxDuration,[120,180,300,1000],1000);
 clean.placeFilters.category=choose(p.category,['all','자연','문화/역사','음식','쇼핑','휴식','액티비티'],'all');
 clean.placeFilters.area=choose(p.area,['all','city','nearby'],'all');
 clean.placeFilters.travel=choose(p.travel,[60,120,999],999);
 clean.placeFilters.duration=choose(p.duration,['all','short','half','day'],'all');
 clean.placeFilters.cost=choose(p.cost,['all','free','paid'],'all');
 clean.exploreCity=choose(raw.exploreCity,CITIES.map(c=>c.id),null);
 clean.exploreTerm=typeof raw.exploreTerm==='string'?raw.exploreTerm.slice(0,80):'';
 clean.window=raw.window===7?7:3;clean.datePricesOpen=raw.datePricesOpen===true;
 clean.cityComparison=Array.isArray(raw.cityComparison)?[...new Set(raw.cityComparison)].filter(id=>!!city(id)).slice(0,3):[];
 clean.openSavedSections=Array.isArray(raw.openSavedSections)?raw.openSavedSections.filter(id=>/^saved-(places|flights)-[A-Z]{3}$/.test(id)).slice(0,60):[];
 clean.flightFiltersOpen=typeof raw.flightFiltersOpen==='boolean'?raw.flightFiltersOpen:undefined;
 clean.placeFiltersOpen=typeof raw.placeFiltersOpen==='boolean'?raw.placeFiltersOpen:undefined;
 return clean;
}
function experienceSnapshot(){
 return {query:{...state.query},filters:{...state.filters},placeFilters:{...state.placeFilters},exploreCity:state.exploreCity,exploreTerm:state.exploreTerm,window:state.window,datePricesOpen:!!state.datePricesOpen,cityComparison:[...(state.cityComparison||[])],openSavedSections:[...(state.openSavedSections||[])],flightFiltersOpen:state.flightFiltersOpen,placeFiltersOpen:state.placeFiltersOpen};
}
function applyExperience(snapshot){
 const safe=sanitizedExperience(snapshot,experienceDefaults);
 const linkedCity=location.hash.split('/')[1];
 if(!snapshot.exploreCity&&location.hash.startsWith('#JSH-02/')&&city(linkedCity))safe.exploreCity=linkedCity;
 if(!sameQuery(state.query,safe.query))state.compare=[];
 Object.assign(state,safe);
}
function publicConditions(){
 return {query:{...state.query},filters:{...state.filters},placeFilters:{...state.placeFilters},window:state.window};
}
function conditionsURL(hash=location.hash,forSharing=false){
 const url=forSharing?new URL(location.origin+location.pathname):new URL(location.href);
 url.hash=hash||'#JSH-01';url.searchParams.set('wq',JSON.stringify(publicConditions()));return url;
}
function captureSearchDraft(){
 const form=$('flight-form');
 if(form){const next=collectQuery(form);if(!validateQuery(next))state.query=next;}
 const homeForm=$('home-flight');
 if(homeForm?.elements){state.query.origin=homeForm.elements.origin.value;state.query.destination=homeForm.elements.destination.value;}
}
function rememberExperience(scroll=window.scrollY){
 if(!experienceReady||experienceRendering)return;
 const snapshot=experienceSnapshot();
 try{sessionStorage.setItem(EXPERIENCE_KEY,JSON.stringify(snapshot));}catch{/* Search remains usable without storage. */}
 try{history.replaceState({...history.state,whever:snapshot,scrollY:scroll},'',conditionsURL());}catch{/* URL replacement may be unavailable in file previews. */}
}
function renderCheckpoint(){if(!experienceRendering)rememberExperience();}
function normalizedRoute(path){const parts=path.replace(/^#/,'').split('/');parts[0]=({home:'JSH-01',explore:'JSH-02',flights:'JSH-03',results:'JSH-04',saved:'JSH-05'})[parts[0]]||parts[0];return '#'+parts.join('/');}
function navigateExperience(path){
 captureSearchDraft();rememberExperience();
 const hash=normalizedRoute(path);nextScroll=0;
 try{
  const url=conditionsURL(hash);if(url.href===location.href){renderExperienceRoute();return;}history.pushState({whever:experienceSnapshot(),scrollY:0},'',url);
  window.dispatchEvent(new Event('hashchange'));
 }catch{location.hash=hash;}
}
function renderExperienceRoute(){
 if($('dialog').open)$('dialog').close();
 experienceRendering=true;
 if(history.state?.whever)applyExperience(history.state.whever);
 else{
  try{const encoded=new URL(location.href).searchParams.get('wq');if(encoded&&encoded.length<6000)applyExperience(JSON.parse(encoded));}catch{/* Ignore malformed public links. */}
 }
 const [routeId,id]=(location.hash.slice(1)||'JSH-01').split('/');
 const scroll=Number.isFinite(history.state?.scrollY)?Math.max(0,history.state.scrollY):nextScroll;
 if(routeId==='screens')screenList();else if(routeId==='JSH-02')explore(id);else if(routeId==='JSH-03')searchPage();else if(routeId==='JSH-04')results();else if(routeId==='JSH-05')savedPage();else home();
 updateCount();lastRouteHash=location.hash;experienceRendering=false;rememberExperience(scroll);
 requestAnimationFrame(()=>{window.scrollTo(0,scroll);$('main').focus({preventScroll:true});});
}
function shareConditionsButton(){return '<button type="button" class="btn outline share-conditions" data-share-conditions>검색 조건 공유 ↗</button>';}
async function shareConditions(){
 if(location.protocol==='file:'){toast('검색 조건 공유는 배포된 사이트에서 사용할 수 있어요.');return;}
 captureSearchDraft();rememberExperience();const link=conditionsURL(location.hash,true).href;
 try{await navigator.clipboard.writeText(link);toast('현재 검색 조건의 링크를 복사했어요.');}
 catch{openModal('검색 조건 링크 공유','<p class="muted">아래 주소를 선택해 복사하세요. 관심 목록은 공유되지 않습니다.</p><label>공유 주소<input id="share-link-field" readonly value="'+esc(link)+'"></label>',7);$('share-link-field').select();}
}
function flightFilterChips(){
 const f=state.filters,items=[];
 if(f.direct)items.push(['direct','직항만']);if(f.baggage)items.push(['baggage','위탁 수하물 포함']);
 if(f.carrier!=='all')items.push(['carrier',f.carrier]);
 if(state.query.destination==='ANY'&&f.budget!==10000000)items.push(['budget',money(f.budget)+' 이하']);
 if(state.query.destination==='ANY'&&f.maxDuration!==1000)items.push(['maxDuration',duration(f.maxDuration)+' 이내']);
 return items;
}
function placeFilterChips(){
 const f=state.placeFilters,items=[];
 if(f.category!=='all')items.push(['category',f.category]);
 if(f.area!=='all')items.push(['area',f.area==='nearby'?'근교·주변만':'목적지 내']);
 if(f.travel!==999)items.push(['travel',f.travel/60+'시간 이내']);
 if(f.duration!=='all')items.push(['duration',({short:'잠깐 방문',half:'반나절',day:'하루'})[f.duration]]);
 if(f.cost!=='all')items.push(['cost',f.cost==='free'?'무료 구역':'비용 발생']);return items;
}
function filterChipHTML(items,scope){return '<div class="active-filter-chips">'+(items.length?items.map(([key,label])=>'<button type="button" class="filter-chip" data-remove-filter="'+key+'" data-filter-scope="'+scope+'" aria-label="'+esc(label)+' 필터 해제">'+esc(label)+' <span aria-hidden="true">×</span></button>').join(''):'<span class="filter-empty-label">추가 필터 없음</span>')+'</div>';}
function compactFilters(){return typeof matchMedia==='function'&&matchMedia('(max-width: 850px)').matches;}
function wrapFlightFilters(html){
 const items=flightFilterChips(),open=typeof state.flightFiltersOpen==='boolean'?state.flightFiltersOpen:!compactFilters();return '<div class="filter-drawer"><details id="flight-filter-drawer" class="filter-disclosure" '+(open?'open':'')+'><summary><span>항공편 필터 <b>'+items.length+'</b></span><span class="filter-open-label">열기·닫기 ⌄</span></summary><div class="filter-drawer-body">'+html+'</div></details>'+filterChipHTML(items,'flight')+'</div>';
}
function wrapPlaceFilters(){
 const row=document.querySelector('#main .filter-row');if(!row||row.closest('.filter-drawer'))return;
 const items=placeFilterChips(),wrapper=document.createElement('div');wrapper.className='filter-drawer place-filter-drawer';
 const open=typeof state.placeFiltersOpen==='boolean'?state.placeFiltersOpen:!compactFilters();
 wrapper.innerHTML='<details id="place-filter-drawer" class="filter-disclosure" '+(open?'open':'')+'><summary><span>장소 필터 <b>'+items.length+'</b></span><span class="filter-open-label">열기·닫기 ⌄</span></summary><div class="filter-drawer-body"></div></details>'+filterChipHTML(items,'place');
 row.before(wrapper);wrapper.querySelector('.filter-drawer-body').append(row);
 const reset=document.createElement('button');reset.type='button';reset.className='outline';reset.dataset.resetPlaces='';reset.textContent='장소 필터 초기화';wrapper.querySelector('.filter-drawer-body').append(reset);
}
function refreshPlaceFilterSummary(){
 const drawer=$('place-filter-drawer');if(!drawer?.parentElement)return;
 const wrapper=drawer.parentElement,items=placeFilterChips();drawer.querySelector('summary b').textContent=items.length;
 wrapper.querySelector('.active-filter-chips').outerHTML=filterChipHTML(items,'place');
 rememberExperience();
}
function savedCityIds(){return CITIES.filter(c=>saved.places.some(id=>PLACES.find(p=>p.id===id)?.city===c.id)||saved.flights.some(f=>f.city===c.id)).map(c=>c.id);}
function cityComparisonOffer(id){
 const c=city(id);if(!c||c.airport===state.query.origin)return null;
 const best=bestSchedule(c,{...state.query,destination:id})[0];return best?{...best,city:c}:null;
}
function shortListConditions(){const q=state.query;return q.mode==='flex'?dateLabel(q.rangeStart)+' ~ '+dateLabel(q.rangeEnd)+' 중 출발 · '+(q.trip==='round'?q.stay+(q.stayMax!==q.stay?'~'+q.stayMax:'')+'박':'편도')+' · 성인 '+q.adults+'명'+(q.children?' · 소아 '+q.children+'명':'')+(q.infants?' · 유아 '+q.infants+'명':'')+' · '+({economy:'일반석',premium:'프리미엄 일반석',business:'비즈니스',first:'일등석'}[q.cabin]):queryText(q);}
function savedCityPage(){
 const ids=savedCityIds();state.cityComparison=(state.cityComparison||[]).filter(id=>ids.includes(id));
 const selected=state.cityComparison;
 main('<div class="section-head"><div><span class="eyebrow">YOUR NEXT TRIP, SIDE BY SIDE</span><h1>다음 여행, 어느 도시로 갈까요?</h1><p class="muted">저장한 장소와 항공편을 도시별로 모았어요. 최대 3개 도시를 골라 비교해보세요.</p></div></div>'+
 '<section class="panel shortlist-conditions"><div><span class="pill">비교에 공통 적용하는 조건</span><p>'+esc(state.query.origin+' 출발 · '+shortListConditions())+'</p><p class="muted">현재 인원·좌석·직항·수하물·항공사 조건의 예시 가격입니다. 저장한 항공편의 과거 가격과 구분해 표시합니다.</p></div><a href="#JSH-03" class="btn secondary">날짜·인원 변경</a></section>'+
 (!storageOK?'<p class="notice">저장 공간을 사용할 수 없어 이번 방문 중에만 관심 목록이 유지됩니다.</p>':'')+
 '<div class="city-compare-controls"><div><strong>비교할 도시 '+selected.length+'/3</strong><span class="muted"> 2개 이상 선택하면 비교할 수 있어요.</span></div><div class="actions"><button data-open-city-comparison '+(selected.length<2?'disabled':'')+'>도시 나란히 비교</button><button class="outline" data-clear-city-comparison '+(!selected.length?'disabled':'')+'>선택 해제</button></div></div>'+
 (ids.length?ids.map(id=>{
  const c=city(id),places=saved.places.map(pid=>PLACES.find(p=>p.id===pid)).filter(p=>p?.city===id),flights=saved.flights.filter(f=>f.city===id),offer=cityComparisonOffer(id),checked=selected.includes(id);
  return '<section class="panel saved-city-group"><div class="saved-city-heading"><div><span class="pill">'+c.country+'</span><h2>'+c.name+'</h2><p class="muted">관심 장소 '+places.length+'곳 · 저장한 항공편 '+flights.length+'개</p></div><button class="city-compare-toggle '+(checked?'selected':'outline')+'" data-toggle-city-comparison="'+id+'" aria-pressed="'+checked+'">'+(checked?'✓ 비교 선택됨':'＋ 도시 비교에 추가')+'</button></div>'+
  '<div class="saved-city-overview"><div class="saved-city-preview">'+(places.length?places.map(p=>'<button class="saved-place-link secondary" data-place="'+p.id+'">'+p.name+'</button>').join(''):'<p class="muted">아직 저장한 장소가 없어요.</p>')+'</div><div class="saved-city-fare"><span class="meta">현재 조건의 예시 최저가</span><strong>'+(offer?money(offer.f.price):'비교 가능한 항공편 없음')+'</strong><span class="meta">'+(offer?esc(dateLabel(offer.q.depart)+(offer.q.trip==='round'?' ~ '+dateLabel(offer.q.back):'')+' · '+(offer.q.trip==='round'?'왕복':'편도')+' · 선택 인원 총액'):(c.airport===state.query.origin?'출발지와 같은 공항입니다.':'날짜나 항공편 필터를 완화해 보세요.'))+'</span></div></div>'+
  '<div class="actions"><a class="btn secondary" href="#JSH-02/'+id+'">'+c.name+' 더 알아보기</a><button data-shortlist-flights="'+id+'" '+(!offer?'disabled':'')+'>이 도시 항공편 비교 ↗</button></div>'+
  (places.length?'<details id="saved-places-'+id+'" class="saved-section" '+((state.openSavedSections||[]).includes('saved-places-'+id)?'open':'')+'><summary>저장한 장소 '+places.length+'곳 자세히 보기</summary><div class="grid">'+places.map(placeCard).join('')+'</div></details>':'')+
  (flights.length?'<details id="saved-flights-'+id+'" class="saved-section" '+((state.openSavedSections||[]).includes('saved-flights-'+id)?'open':'')+'><summary>저장한 항공편 '+flights.length+'개 보기</summary><p class="muted">저장 시점의 예시 가격입니다.</p>'+flights.map(flightCard).join('')+'</details>':'')+'</section>';
 }).join(''):'<div class="empty"><h2>마음에 드는 여행부터 모아보세요.</h2><p>명소나 항공편의 ♡ 버튼을 누르면 도시별로 정리해드려요.</p><a class="btn" href="#JSH-02">여행지 탐색하기</a></div>')+
 (saved.flights.length?'<div class="panel"><h3>저장한 항공편끼리 비교</h3><div class="actions"><button class="secondary" data-compare-open>항공편 비교함 ('+state.compare.length+'/3)</button><button class="outline" data-clear-compare>항공편 비교함 비우기</button></div></div>':''));
 renderCheckpoint();
}
function openCityComparison(){
 const ids=(state.cityComparison||[]).filter(id=>savedCityIds().includes(id));if(ids.length<2){toast('비교할 도시를 2개 이상 골라주세요.');return;}
 const offers=ids.map(cityComparisonOffer),places=ids.map(id=>saved.places.map(pid=>PLACES.find(p=>p.id===pid)).filter(p=>p?.city===id));
 const cheapestPrice=Math.min(...offers.filter(Boolean).map(o=>o.f.price));
 const row=(heading,values)=>'<tr><th scope="row">'+heading+'</th>'+values.map(value=>'<td>'+value+'</td>').join('')+'</tr>';
 openModal('여행 후보 도시 비교','<p>'+esc(state.query.origin+' 출발 · '+shortListConditions())+'</p><p class="notice">선택 인원 총액의 가상 가격입니다. 유연한 날짜에서는 동일 탐색 기간 안의 최저가를 비교하므로 실제 출발·귀국일이 도시마다 다를 수 있습니다.</p><p class="muted">좁은 화면에서는 표를 좌우로 밀어 비교하세요.</p><div class="comparison city-comparison-table"><table><thead><tr><th scope="col">비교 항목</th>'+ids.map(id=>'<th scope="col">'+city(id).name+'</th>').join('')+'</tr></thead><tbody>'+
 row('예시 최저가',offers.map(o=>o?'<strong class="comparison-price">'+money(o.f.price)+'</strong>'+(o.f.price===cheapestPrice?'<span class="pill">선택 도시 중 최저가</span>':''):'현재 조건의 항공편 없음'))+
 row('실제 비교 일정',offers.map(o=>o?esc(dateLabel(o.q.depart)+(o.q.trip==='round'?' ~ '+dateLabel(o.q.back):'')):'—'))+
 row('저장한 장소',places.map(list=>list.length?'<ul>'+list.map(p=>'<li>'+esc(p.name)+'</li>').join('')+'</ul>':'저장한 장소 없음'))+
 row('관심사',places.map(list=>[...new Set(list.map(p=>p.category))].map(category=>'<span class="pill">'+category+'</span>').join(' ')||'—'))+
 row('편도 소요시간',offers.map(o=>o?duration(o.f.minutes)+' · '+(o.f.stops?'1회 경유':'직항'):'—'))+
 row('다음 단계',ids.map((id,i)=>'<button data-shortlist-flights="'+id+'" '+(!offers[i]?'disabled':'')+'>항공편 보기</button>'))+'</tbody></table></div>',6);
}
function initializeExperience(){
 experienceDefaults=experienceSnapshot();
 let initial=null;try{const encoded=new URL(location.href).searchParams.get('wq');if(encoded&&encoded.length<6000)initial=JSON.parse(encoded);}catch{/* Keep defaults for malformed links. */}
 if(!initial)try{initial=JSON.parse(sessionStorage.getItem(EXPERIENCE_KEY)||'null');}catch{/* Session storage is optional. */}
 if(initial)applyExperience(initial);
 try{history.scrollRestoration='manual';history.replaceState({...history.state,whever:experienceSnapshot(),scrollY:0},'',location.href);}catch{/* Native hash navigation remains available. */}
 const originalHome=home,originalSearch=searchPage,originalExplore=explore,originalResults=results,originalFilter=filterPanel,originalRenderPlaces=renderPlaces;
 home=function(){originalHome();renderCheckpoint();};
 searchPage=function(){originalSearch();const section=document.querySelector('#main .section-head');if(section)section.insertAdjacentHTML('beforeend',shareConditionsButton());renderCheckpoint();};
 explore=function(id){originalExplore(id);wrapPlaceFilters();const section=document.querySelector('#main .section-head');if(section)section.insertAdjacentHTML('beforeend',shareConditionsButton());renderCheckpoint();};
 results=function(){originalResults();const section=document.querySelector('#main .section-head');if(section)section.insertAdjacentHTML('beforeend',shareConditionsButton());renderCheckpoint();};
 filterPanel=function(){return wrapFlightFilters(originalFilter());};
 renderPlaces=function(id){originalRenderPlaces(id);refreshPlaceFilterSummary();};
 savedPage=savedCityPage;go=navigateExperience;route=renderExperienceRoute;
 experienceReady=true;
 window.addEventListener('hashchange',renderExperienceRoute);
 window.addEventListener('popstate',()=>{if(location.hash===lastRouteHash)renderExperienceRoute();});
 window.addEventListener('scroll',()=>{clearTimeout(experienceTimer);experienceTimer=setTimeout(()=>rememberExperience(),180);},{passive:true});
 window.addEventListener('pagehide',()=>{captureSearchDraft();rememberExperience();});
 document.addEventListener('input',event=>{if(event.target.closest('#flight-form,#home-flight')){captureSearchDraft();rememberExperience();}});
 document.addEventListener('change',()=>{setTimeout(()=>{captureSearchDraft();rememberExperience();},0);});
 document.addEventListener('toggle',event=>{if(event.target.id?.startsWith('saved-')&&event.target.isConnected){const open=new Set(state.openSavedSections||[]);event.target.open?open.add(event.target.id):open.delete(event.target.id);state.openSavedSections=[...open];rememberExperience();}},true);
 document.addEventListener('toggle',event=>{if(!event.target.isConnected)return;if(event.target.id==='flight-filter-drawer')state.flightFiltersOpen=event.target.open;if(event.target.id==='place-filter-drawer')state.placeFiltersOpen=event.target.open;rememberExperience();},true);
 document.addEventListener('click',event=>{
  const link=event.target.closest('a[href^="#"]');
  if(link&&link.closest('#app,#dialog')&&!event.metaKey&&!event.ctrlKey&&!event.shiftKey&&!event.altKey){event.preventDefault();const hash=link.getAttribute('href');if(hash==='#main'){$('main').focus();$('main').scrollIntoView();}else navigateExperience(hash);return;}
  const button=event.target.closest('button');if(!button)return;const data=button.dataset;
  if('shareConditions'in data)shareConditions();
  if(data.removeFilter){const target=data.filterScope==='place'?state.placeFilters:state.filters,defaults=data.filterScope==='place'?PLACE_FILTER_DEFAULTS:FLIGHT_FILTER_DEFAULTS;target[data.removeFilter]=defaults[data.removeFilter];if(data.filterScope==='place')explore(state.exploreCity);else results();}
  if(data.toggleCityComparison){const selected=state.cityComparison||[];if(selected.includes(data.toggleCityComparison))state.cityComparison=selected.filter(id=>id!==data.toggleCityComparison);else if(selected.length<3)state.cityComparison=[...selected,data.toggleCityComparison];else{toast('도시는 최대 3개까지 비교할 수 있어요.');return;}savedPage();rememberExperience();}
  if('clearCityComparison'in data){state.cityComparison=[];savedPage();}
  if('openCityComparison'in data)openCityComparison();
  if(data.shortlistFlights){state.query.destination=data.shortlistFlights;state.compare=[];go('results');}
  setTimeout(()=>{captureSearchDraft();rememberExperience();},0);
 });
 renderExperienceRoute();
}
