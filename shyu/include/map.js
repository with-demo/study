/* 키 입력 없이 표시하는 지도. 현재 보이는 범위의 타일만 요청합니다. */
(()=>{
 let currentMap=null;
 function mount(container,items,activeKey,onSelect){
  if(currentMap){currentMap.remove();currentMap=null;}
  if(!container)return;
  const status=document.getElementById('map-status'),say=text=>{if(status)status.textContent=text;};
  if(!window.L){say('지도 파일을 불러오지 못했습니다. 아래 공간 목록을 이용해 주세요.');return;}
  const map=L.map(container,{scrollWheelZoom:false,zoomControl:true}).setView([37.565,126.99],11);currentMap=map;
  map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
  if(['http:','https:'].includes(location.protocol)){
   const tiles=L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:18,attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap contributors</a>',referrerPolicy:'strict-origin-when-cross-origin'}).addTo(map);
   let loaded=0;
   tiles.on('tileload',()=>{loaded++;say(items.length?'마커를 선택해 프로그램을 확인하세요.':'조건에 맞는 공간이 없습니다.');});
   tiles.on('tileerror',()=>{if(!loaded)say('지도 배경을 불러오지 못했습니다. 인터넷 연결을 확인해 주세요.');});
  }else{say('지도 배경은 shyu 폴더의 ‘로컬 미리보기.cmd’를 실행하면 표시됩니다. 현재는 예시 장소 마커를 보여드립니다.');}
  const bounds=[];
  items.forEach((p,i)=>{
   bounds.push(p.mapPosition);
   const label=document.createElement('span');label.className='place-marker-label';label.textContent=p.place;
   const wrapper=document.createElement('div');wrapper.className='place-marker-body';
   const number=document.createElement('span');number.className='place-marker-number';number.textContent=String(i+1);wrapper.append(number,label);
   const icon=L.divIcon({className:'reading-place-marker',html:wrapper,iconSize:[180,40],iconAnchor:[90,40]});
   const marker=L.marker(p.mapPosition,{icon,title:`${p.place} (예시 위치)`,alt:`${p.place} 프로그램 정보`,keyboard:true}).addTo(map);
   const popup=document.createElement('div');popup.className='place-popup';
   const title=document.createElement('strong');title.textContent=p.place;
   const type=document.createElement('p');type.textContent=`${p.district} · ${p.type}`;
   const program=document.createElement('p');program.textContent=p.name;
   const open=document.createElement('button');open.type='button';open.className='button primary';open.textContent='공간·프로그램 확인';open.addEventListener('click',()=>onSelect(p.key));
   popup.append(title,type,program,open);marker.bindPopup(popup,{minWidth:230});
  });
  if(bounds.length>1)map.fitBounds(bounds,{padding:[90,65],maxZoom:12});
  else if(bounds.length===1)map.setView(bounds[0],13);
  if(!items.length)say('조건에 맞는 공간이 없습니다. 검색 조건을 변경해 주세요.');
 }
 window.ShyuMap={mount};
})();
