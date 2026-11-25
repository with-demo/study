'use strict';
const spec=window.WHEVER_SPEC;
const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const screenName=id=>id.replaceAll('JSH-','JSH2-');
document.getElementById('screens').innerHTML=spec.screens.map(row=>{
  const [id,name,type,purpose,entry,next,note]=row;
  const route=id==='JSH-02/{도시ID}'?'JSH2-02/TYO':screenName(id);
  const link=id.startsWith('JSH-')||id==='screens'?`<a href="./index.html#${encodeURI(route)}">화면 열기</a>`:'<span>관련 화면에서 열기</span>';
  return `<article class="screen"><code>${escapeHTML(screenName(id))}</code><h3>${escapeHTML(name)}</h3><p>${escapeHTML(purpose)}</p><p>${escapeHTML(note)}</p>${link}</article>`;
}).join('');
const select=document.getElementById('screen-filter');
for(const id of new Set(spec.features.map(f=>f[1])))select.add(new Option(screenName(id),id));
function render(){
  const term=document.getElementById('search').value.trim().toLocaleLowerCase();
  const rows=spec.features.filter(row=>(!select.value||row[1]===select.value)&&screenName(row.join(' ')).toLocaleLowerCase().includes(term.replaceAll('jsh-','jsh2-')));
  document.getElementById('count').textContent=`전체 ${spec.features.length}개 중 ${rows.length}개 기능`;
  document.getElementById('features').innerHTML=rows.length?rows.map(([id,screen,area,name,input,behavior,next,limit])=>`<tr><td><strong>${id}</strong><small>${escapeHTML(screenName(screen))}</small></td><td><strong>${escapeHTML(name)}</strong><small>${escapeHTML(area)}</small></td><td>${escapeHTML(input)}</td><td>${escapeHTML(behavior)}<small>연결: ${escapeHTML(screenName(next))}</small></td><td>${escapeHTML(limit)}</td></tr>`).join(''):'<tr><td colspan="5">검색 조건에 맞는 기능이 없습니다.</td></tr>';
}
document.getElementById('search').addEventListener('input',render);select.addEventListener('change',render);
document.getElementById('reset').addEventListener('click',()=>{document.getElementById('search').value='';select.value='';render();});
render();
