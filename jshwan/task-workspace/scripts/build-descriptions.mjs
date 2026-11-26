import path from 'node:path';
import fs from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
const modules=path.resolve(process.env.TASK_DEMO_NODE_MODULES||'node_modules');
const {build}=await import(pathToFileURL(path.join(modules,'esbuild/lib/main.js')).href);
await build({entryPoints:['demo/descriptions.ts'],outfile:'outputs/descriptions.mjs',bundle:true,format:'esm',platform:'node'});
const {descriptions,popupDescriptions}=await import(pathToFileURL(path.resolve('outputs/descriptions.mjs')).href+'?build='+Date.now());
const cell=value=>value.replaceAll('|','\\|').replaceAll('\n','<br>');
let md='# Task 화면별 Description\n\n실제 GitHub Pages 스터디 데모의 동작을 기준으로 작성했습니다.\n\n- [사이트 열기](https://with-demo.github.io/study/jshwan/task-workspace/) → 상단 **Description 열기**\n- 항목: 화면 개요, 항목, 유형, 기본값, 필수여부, 기능상세, 알림·확인·예외\n- 검은 공통 도구는 번호 대상에서 제외하며 화면마다 01부터 시작합니다.\n- 팝업은 부모 화면 ID 뒤에 p01(작업), p02(프로젝트), p03(검색)을 붙입니다. 예: JST-HOME-01-p01.\n- 실제 인증·서버 저장·기기 간 동기화·공동 편집은 연결하지 않았습니다. Task 데이터는 브라우저에 저장합니다.\n- Description은 GitHub 소스로 관리하는 읽기 전용 문서입니다. 원본: demo/descriptions.ts. 빌드 시 이 문서를 자동 생성합니다.\n- 프로젝트 상세 3개 화면은 프로젝트 생성 후 카드와 상세 탭에서 진입합니다. 빈 상태·보드·선택 작업 등 조건부 영역의 번호는 해당 영역이 표시될 때만 나타납니다.\n\n';
for(const [id,spec] of [...Object.entries(descriptions),...Object.entries(popupDescriptions)]){
 md+='## '+(id.startsWith('p')?'부모화면-'+id:id)+' · '+spec.title+'\n\n'+spec.overview+'\n\n';
 md+='| 번호 | 항목 | 유형 | 기본값 | 필수여부 | 기능상세 |\n| --- | --- | --- | --- | --- | --- |\n';
 spec.items.forEach((x,i)=>{md+='| '+[String(i+1).padStart(2,'0'),x.item,x.type,x.defaultValue,x.required,x.detail].map(cell).join(' | ')+' |\n';});
 md+='\n알림·확인·예외:\n\n'+spec.messages.map(x=>'- '+x).join('\n')+'\n\n';
}
await fs.writeFile('SCREEN-DESCRIPTIONS.md',md);
console.log('Description document generated: '+Object.keys(descriptions).length+' screens / '+Object.keys(popupDescriptions).length+' popup templates.');
