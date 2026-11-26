export const studyScreens=[
 {id:'JST-AUTH-01',route:'/login',title:'로그인',summary:'실제 인증 없이 로그인 버튼으로 데모에 진입합니다.'},
 {id:'JST-HOME-01',route:'/',title:'홈',summary:'오늘·지연·진행 중 작업과 프로젝트 진행률을 확인합니다.'},
 {id:'JST-TASK-01',route:'/tasks',title:'전체 작업',summary:'필터와 정렬, 목록·보드 전환, 일괄 변경을 체험합니다.'},
 {id:'JST-TASK-02',route:'/tasks?view=today',title:'오늘',summary:'오늘 마감과 기한 초과 작업을 나누어 표시합니다.'},
 {id:'JST-TASK-03',route:'/tasks?view=upcoming',title:'예정',summary:'내일 이후 마감인 미완료 작업을 날짜별로 표시합니다.'},
 {id:'JST-TASK-04',route:'/tasks?view=done',title:'완료',summary:'완료한 작업을 확인하고 다시 열 수 있습니다.'},
 {id:'JST-TASK-05',route:'/tasks?view=overdue',title:'기한 초과',summary:'오늘 이전에 마감한 미완료 작업을 확인합니다.'},
 {id:'JST-TASK-06',route:'/tasks?view=doing',title:'진행 중',summary:'현재 진행 중인 작업을 확인합니다.'},
 {id:'JST-PROJ-01',route:'/projects',title:'프로젝트',summary:'프로젝트 생성·수정, 완료율과 소속 작업을 확인합니다.'},
 {id:'JST-CAL-01',route:'/calendar',title:'캘린더',summary:'월간 일정과 날짜별 작업 추가를 체험합니다.'},
 {id:'JST-ARCH-01',route:'/archive',title:'보관함',summary:'보관한 프로젝트를 조회하고 보관을 해제합니다.'},
 {id:'JST-ARCH-02',route:'/archive?tab=trash',title:'휴지통',summary:'삭제한 작업·프로젝트를 복원하거나 영구 삭제합니다.'},
 {id:'JST-SET-01',route:'/settings/account',title:'계정',summary:'데모 사용자 정보와 로그인 화면으로 돌아가기입니다.'},
 {id:'JST-SET-02',route:'/settings/workspace',title:'작업 공간 설정',summary:'이름, 시작 화면, 주 시작 요일을 브라우저에 저장합니다.'},
 {id:'JST-SET-03',route:'/settings/data',title:'데이터 관리',summary:'브라우저 저장 안내와 JSON 백업·가져오기입니다.'}
];
export function demoPath(){const hash=decodeURIComponent(location.hash.slice(1));if(hash==='screens')return '/screens';return studyScreens.find(s=>s.id===hash)?.route||(hash.startsWith('/')?hash:'/login');}
export function demoNavigate(route:string){const screen=studyScreens.find(s=>s.route===route);const hash=route==='/screens'?'screens':screen?.id||route;history.pushState({},'',location.pathname+location.search+'#'+hash);window.dispatchEvent(new HashChangeEvent('hashchange'));}
export function screenIdForRoute(route:string){
 if(route==='/screens')return 'screens';
 const [path,query]=route.split('?');const params=new URLSearchParams(query);
 if(path.startsWith('/projects/'))return params.get('tab')==='board'?'JST-PROJ-04':params.get('tab')==='list'?'JST-PROJ-03':'JST-PROJ-02';
 return studyScreens.find(s=>s.route===route)?.id||'JST-TASK-01';
}
export function updateDescriptionContext(route:string,popup:'task'|'project'|'search'|null){
 const id=screenIdForRoute(route);document.body.dataset.screen=id;
 const w=window as unknown as Record<string,unknown>;
 if(popup)w.MOCKUP_DESCRIPTION_CONTEXT={id:id+'-'+({task:'p01',project:'p02',search:'p03'}[popup]),title:popup==='task'?'작업 상세':popup==='project'?'프로젝트 편집':'통합 검색'};
 else delete w.MOCKUP_DESCRIPTION_CONTEXT;
 window.dispatchEvent(new Event('study-description-update'));
}
