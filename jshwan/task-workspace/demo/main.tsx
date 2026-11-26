import { createRoot } from 'react-dom/client';
import TaskApp from '../app/task-app';
import '../app/task.css';
import './study.css';
import { studyScreens } from './routing';
const w=window as unknown as Record<string,unknown>;
w.GFAIR_SCREENS=[{name:'jshwan · Task 스터디',screens:studyScreens}];
createRoot(document.getElementById('app')!).render(<TaskApp demo/>);
function drawDescription(){const panel=document.querySelector<HTMLElement>('.ui-spec-panel');if(!panel||panel.hidden)return;const context=w.MOCKUP_DESCRIPTION_CONTEXT as {id:string;title:string}|undefined;const screen=studyScreens.find(s=>s.id===document.body.dataset.screen);const title=document.createElement('h2');title.textContent=context?.title||screen?.title||'프로젝트 상세';const id=document.createElement('p');id.textContent=context?.id||document.body.dataset.screen||'';const summary=document.createElement('p');summary.textContent=context?'입력 후 저장하면 이 브라우저에 반영됩니다. 취소 시 저장하지 않은 변경은 버립니다.':screen?.summary||'선택 프로젝트의 개요, 목록과 보드를 조회합니다.';const note=document.createElement('p');note.textContent='스터디용 읽기 전용 설명입니다. 실제 인증·서버 저장·공동 편집은 연결하지 않았습니다.';panel.replaceChildren(title,id,summary,note);}
window.addEventListener('annotation-render',drawDescription);window.addEventListener('annotation-sync',drawDescription);window.addEventListener('study-description-update',drawDescription);
const common=document.createElement('script');common.src='../../common/include/spec-panel.js';common.onload=()=>{document.querySelector('.ui-spec-actions label')?.setAttribute('hidden','');for(const action of ['numbers','refresh'])document.querySelector(`[data-spec="${action}"]`)?.setAttribute('hidden','');drawDescription();};document.body.append(common);
