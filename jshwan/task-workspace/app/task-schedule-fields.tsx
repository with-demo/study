import type { TaskSchedule } from './task-schedule';
import { toggleTaskStartDate } from './task-schedule';
export function TaskScheduleFields({value,onChange}:{value:TaskSchedule;onChange:(value:TaskSchedule)=>void}){
 const invalid=value.useStartDate&&!!value.startDate&&!!value.due&&value.startDate>value.due;
 return <section className="task-schedule" aria-label="작업 일정">
  <label className="inline"><input type="checkbox" checked={value.useStartDate} aria-controls="task-start-date-field" onChange={e=>onChange(toggleTaskStartDate(value,e.target.checked))}/>시작일 설정</label>
  <div className="field-grid">
   {value.useStartDate&&<label id="task-start-date-field">시작일<input type="date" aria-label="시작일" required value={value.startDate} max={value.due||undefined} aria-invalid={invalid||undefined} aria-describedby="task-schedule-help" onChange={e=>onChange({...value,startDate:e.target.value})}/></label>}
   <label>마감일<input type="date" aria-label="마감일" value={value.due} min={value.useStartDate?value.startDate||undefined:undefined} aria-describedby="task-schedule-help" onChange={e=>onChange({...value,due:e.target.value})}/></label>
  </div>
  <small id="task-schedule-help">{invalid?'시작일은 마감일보다 늦을 수 없습니다.':value.useStartDate?'시작일을 입력해주세요. 마감일 없이 시작일만 설정할 수도 있습니다.':'필요한 경우 시작일 설정을 체크해주세요.'}</small>
 </section>;
}
