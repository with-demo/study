import { createRoot } from 'react-dom/client';
import TaskApp from '../app/task-app';
import '../app/task.css';
import './study.css';
import { studyScreens } from './routing';
const w=window as unknown as Record<string,unknown>;
w.GFAIR_SCREENS=[{name:'jshwan · Task 스터디',screens:studyScreens}];
createRoot(document.getElementById('app')!).render(<TaskApp demo/>);
import './description-panel';
