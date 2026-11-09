/* 명소 이미지 카드·상세·관련 명소 및 동일 해시 방문 기록 검증 */
const{chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:process.env.CHROMIUM_PATH||undefined,args:['--no-sandbox']});
 const page=await browser.newPage({viewport:{width:1440,height:1000}}),errors=[],missing=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.url().includes('/hekim/')&&r.status()===404)missing.push(r.url());});
 await page.route('**/api/collab**',r=>r.fulfill({json:{records:[],user:null,githubConfigured:false}}));
 await page.goto(process.env.YEOJEONG_TEST_URL||'http://127.0.0.1:8765/hekim/index.html');
 const wait=()=>page.waitForTimeout(60),go=async id=>{await page.locator('.ui-spec-screen-picker').selectOption(id);await wait();};
 const title=async name=>page.waitForFunction(name=>document.querySelector('.spot-detail-title h1')?.textContent===name,name);
 assert.equal(await page.evaluate(()=>YEOJEONG_SCREENS.length),22);assert.equal(await page.evaluate(()=>YEOJEONG_SPOTS.length),44);assert.equal(await page.evaluate(()=>YJStore.loggedIn),false);
 for(const d of await page.evaluate(()=>YEOJEONG_DEMO.destinations.map(d=>({id:d.id,name:d.name,spots:d.spots})))){
  await go('TRV-01');await page.getByRole('link',{name:d.name,exact:true}).click();await page.locator('.destination-detail').waitFor();assert.equal(await page.locator('.landmark-card').count(),d.spots.length);
  await page.locator('.landmark-image img').evaluateAll(images=>images.forEach(img=>img.loading='eager'));await page.waitForFunction(()=>[...document.querySelectorAll('.landmark-image img')].every(img=>img.complete&&img.naturalWidth>0));
  const sources=await page.locator('.landmark-image img').evaluateAll(images=>images.map(img=>img.getAttribute('src')));assert.equal(new Set(sources).size,d.spots.length);
  if(d.id==='jeju')await page.screenshot({path:'/tmp/yeojeong-landmark-cards.png',fullPage:true});
  for(let i=0;i<d.spots.length;i++){
   const card=page.locator('.landmark-card').nth(i);await card.focus();await page.keyboard.press('Enter');await title(d.spots[i]);assert.equal(await page.evaluate(()=>YJ.route()),'TRV-06');
   assert.equal(await page.locator('.spot-detail-image img').getAttribute('src'),sources[i]);await page.waitForFunction(()=>{const img=document.querySelector('.spot-detail-image img');return img?.complete&&img.naturalWidth>0;});
   assert.ok(await page.locator('.spot-story>p').first().innerText());assert.match(await page.locator('.spot-visit').innerText(),/추천 체류 시간/);
   const url=new URL(await page.locator('.external-map-link').getAttribute('href'));assert.equal(url.hostname,'www.google.com');assert.ok(url.searchParams.get('query').includes(d.spots[i]));assert.equal(await page.locator('.external-map-link').getAttribute('target'),'_blank');
   assert.doesNotMatch(await page.locator('.yj-screen-overview').innerText(),/undefined|null/);assert.equal(await page.evaluate(()=>YJStore.loggedIn),false);
   await page.locator('.spot-detail-page .back-link').click();await page.locator('.destination-detail').waitFor();assert.equal(await page.locator('.destination-detail h1').innerText(),d.name);
  }
 }
 // 같은 화면 ID의 관련 명소 이동에서도 뒤로가기·앞으로가기로 선택 복원.
 await go('TRV-01');await page.getByRole('link',{name:'제주',exact:true}).click();await page.locator('.landmark-card').first().click();await title('성산일출봉');
 const previous=await page.locator('.spot-detail-title h1').innerText(),next=await page.locator('.spot-related .landmark-card h3').first().evaluate(el=>el.childNodes[0].textContent.trim());
 await page.locator('.spot-related .landmark-card').first().click();await title(next);await page.goBack();await title(previous);await page.goForward();await title(next);await page.reload();await title(next);
 for(const width of [1440,1101,768,390,320]){
  await page.setViewportSize({width,height:1000});
  for(const open of [false,true]){
   if(await page.locator('.ui-spec-panel').isVisible()!==open)await page.locator('[data-spec="close"]').click();
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${width} ${open}`);
   assert.ok(await page.locator('.spot-detail-image img').isVisible());
  }
 }
 await page.setViewportSize({width:1440,height:1000});if(await page.locator('.ui-spec-panel').isVisible())await page.locator('[data-spec="close"]').click();await page.screenshot({path:'/tmp/yeojeong-landmark-detail.png',fullPage:true});
 await page.locator('[data-spec="numbers"]').click();await page.locator('[data-local-pin="spot-story"]').click();assert.equal(await page.locator('#yj-spec-spot-story.selected').count(),1);await page.locator('[data-local-pin="spot-story"]').click();assert.equal(await page.locator('.ui-spec-panel').isVisible(),false);
 await page.evaluate(()=>YJ.go('TRV-06',{destinationId:'jeju',spotId:'missing'}));await page.locator('.empty-state').waitFor();assert.ok(await page.getByRole('link',{name:'목록으로 이동',exact:true}).count());
 await page.evaluate(()=>YJ.go('TRV-06',{destinationId:'paris',spotId:'jeju-seongsan'}));await page.locator('.empty-state').waitFor();
 await page.evaluate(()=>YJ.go('TRV-06',{destinationId:'jeju',spotId:null}));await title('성산일출봉');
 // 명소 선택 없는 직접 진입에서는 현재 여행지의 첫 명소 표시.
 await go('TRV-01');await page.getByRole('link',{name:'교토',exact:true}).click();await go('TRV-06');await title('기요미즈데라');
 assert.deepEqual(errors,[]);assert.deepEqual(missing,[]);await browser.close();console.log('PASS: 44 unique images/details, keyboard cards, destination preservation, same-ID back/forward/reload, map links, 5 widths with descriptions open/closed, pin toggle, invalid/mismatched IDs and direct entry.');
})().catch(e=>{console.error(e);process.exit(1)});
