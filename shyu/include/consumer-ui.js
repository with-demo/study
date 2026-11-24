/* 표시 전용 도우미. 화면 ID·예약·회원 저장 로직은 app.js에 유지합니다. */
window.ShyuConsumerUI={
 bookMark:'<svg viewBox="0 0 64 54" aria-hidden="true"><path d="M7 13q13-5 25 3 12-8 25-3v32q-14-5-25 3-11-8-25-3Z" fill="#ecf3d7" stroke="#537e3c" stroke-width="3" stroke-linejoin="round"/><path d="M32 16v32M32 2v5M17 3l3 6M47 3l-3 6" fill="none" stroke="#537e3c" stroke-width="3" stroke-linecap="round"/></svg>',
 poster(p,large=false){
  const index=Number(p.key.split('-')[1])-1;
  return `<div class="program-poster poster-${index%4} ${large?'poster-large':''}"><img src="assets/images/${p.image.file}" alt="" style="object-position:${p.image.position}" loading="lazy"><div class="poster-copy"><small>책이음 · ${p.type}</small><strong>${p.name}</strong><span>읽는 즐거움에서,<br>함께하는 즐거움으로</span></div><span class="poster-example">프로그램 이미지 예시</span></div>`;
 },
 breadcrumb(label){return `<div class="breadcrumb"><a href="#SHHOME-01">홈</a><span aria-hidden="true">›</span><span>${label}</span></div>`;},
 steps(active=0){return `<ol class="stepper" aria-label="신청 진행 단계">${['신청서 작성','내용 확인','신청 완료'].map((s,i)=>`<li class="${i===active?'active':''}" ${i===active?'aria-current="step"':''}><span>0${i+1}</span> ${s}</li>`).join('')}</ol>`;}
};
