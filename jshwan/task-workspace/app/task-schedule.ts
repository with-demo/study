export type TaskSchedule = { useStartDate:boolean; startDate:string; due:string };
/** 기존 데이터는 시작일 미사용으로 읽고, 해제된 시작일은 저장하지 않는다. */
export function normalizeTaskSchedule<T extends TaskSchedule>(task:T):T {
 if(!task.useStartDate)task.startDate='';
 else if(!task.startDate)throw Error('시작일을 입력하거나 시작일 설정을 해제해주세요.');
 else if(task.due&&task.startDate>task.due)throw Error('시작일은 마감일보다 늦을 수 없습니다.');
 return task;
}
export function toggleTaskStartDate<T extends TaskSchedule>(task:T,enabled:boolean):T {
 return {...task,useStartDate:enabled,startDate:enabled?task.startDate:''};
}
