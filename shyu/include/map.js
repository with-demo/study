/* 키 입력 없이 표시하는 지도. 현재 보이는 범위의 타일만 요청합니다. */
(()=>{
 let currentMap=null,resizeObserver=null;
 function unmount(){if(resizeObserver){resizeObserver.disconnect();resizeObserver=null;}if(currentMap){currentMap.remove();currentMap=null;}}
 function embedded(container,items,activeKey,onSelect){
  const frame=document.createElement('iframe');frame.className='embedded-reading-map';frame.title='독서 공간 실제 지도 · OpenStreetMap';frame.loading='eager';
  const choices=document.createElement('div');choices.className='embedded-place-choices';choices.setAttribute('aria-label','지도에서 확인할 공간');
  const show=p=>{const point=p?.mapPosition;const bbox=point?[point[1]-.055,point[0]-.035,point[1]+.055,point[0]+.035]:[126.85,37.46,127.17,37.66];const query=new URLSearchParams({bbox:bbox.join(','),layer:'mapnik'});if(point)query.set('marker',point.join(','));frame.src='https://www.openstreetmap.org/export/embed.html?'+query;choices.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.place===p?.key)));};
  items.forEach(p=>{const button=document.createElement('button');button.type='button';button.dataset.place=p.key;button.textContent=p.place;button.addEventListener('click',()=>show(p));choices.append(button);});
  const selected=items.find(p=>p.key===activeKey)||items[0];
  container.classList.add('is-embedded');container.replaceChildren(frame,choices);show(selected);
  const status=document.getElementById('map-status');if(status)status.textContent='공간 이름을 선택하면 지도에서 위치를 확인할 수 있어요. 아래 공간 카드에서 프로그램을 살펴보세요.';
 }
 function mount(container,items,activeKey,onSelect){
  unmount();
  if(!container)return;
  const status=document.getElementById('map-status'),say=text=>{if(status)status.textContent=text;};
  if(location.protocol==='file:'||!window.L){embedded(container,items,activeKey,onSelect);return;}
  container.classList.remove('is-embedded');
  const map=L.map(container,{scrollWheelZoom:false,zoomControl:true}).setView([37.565,126.99],11);currentMap=map;
  map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
  if(['http:','https:'].includes(location.protocol)){
   const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>',referrerPolicy:'strict-origin-when-cross-origin'}).addTo(map);
   let loaded=0;
   tiles.on('tileload',()=>{loaded++;say(items.length?'마커를 선택해 프로그램을 확인하세요.':'조건에 맞는 공간이 없습니다.');});
   tiles.on('tileerror',()=>{if(!loaded)say('지도 배경을 불러오지 못했습니다. 인터넷 연결을 확인해 주세요.');});
  }
  const bounds=[];
  items.forEach((p,i)=>{
   bounds.push(p.mapPosition);
   const label=document.createElement('span');label.className='place-marker-label';label.textContent=p.place;
   const wrapper=document.createElement('div');wrapper.className='place-marker-body';
   const number=document.createElement('span');number.className='place-marker-number';number.textContent=String(i+1);wrapper.append(number,label);
   const icon=L.divIcon({className:'reading-place-marker',html:wrapper,iconSize:[180,40],iconAnchor:[90,40]});
   const marker=L.marker(p.mapPosition,{icon,title:`${p.place}`,alt:`${p.place} 프로그램 정보`,keyboard:true}).addTo(map);
   const popup=document.createElement('div');popup.className='place-popup';
   const title=document.createElement('strong');title.textContent=p.place;
   const type=document.createElement('p');type.textContent=`서울특별시 ${p.district} 책길 ${Number(p.key.slice(-1))*12} · ${p.type}`;
   const program=document.createElement('p');program.textContent=p.name;
   const open=document.createElement('button');open.type='button';open.className='button primary';open.textContent='공간·프로그램 확인';open.addEventListener('click',()=>onSelect(p.key));
   popup.append(title,type,program,open);marker.bindPopup(popup,{minWidth:230});
  });
  if(bounds.length>1)map.fitBounds(bounds,{padding:[90,65],maxZoom:12});
  else if(bounds.length===1)map.setView(bounds[0],13);
  if(!items.length)say('조건에 맞는 공간이 없습니다. 검색 조건을 변경해 주세요.');
  requestAnimationFrame(()=>{if(currentMap===map)map.invalidateSize({pan:false});});
  if(window.ResizeObserver){resizeObserver=new ResizeObserver(()=>{if(currentMap===map)map.invalidateSize({pan:false});});resizeObserver.observe(container);}
 }
 function locate(){const status=document.getElementById('location-status');if(!navigator.geolocation){if(status)status.textContent='현재 위치를 사용할 수 없어 서울 기본 지도를 표시합니다.';return;}if(status)status.textContent='현재 위치 권한을 확인하고 있습니다.';navigator.geolocation.getCurrentPosition(position=>{if(currentMap){currentMap.setView([position.coords.latitude,position.coords.longitude],13);if(status)status.textContent='현재 위치 주변을 표시했습니다.';}else if(status)status.textContent='현재 지도에서는 위치 이동을 지원하지 않습니다. 지역 검색을 이용해 주세요.';},()=>{if(status)status.textContent='위치 권한이 없거나 위치를 확인할 수 없어 기본 지도를 유지합니다.';},{enableHighAccuracy:false,timeout:8000,maximumAge:60000});}
 window.ShyuMap={mount,unmount,locate};
})();
