import { Actions } from '../../types/enum';
import { ColumnItemType, ITask } from '../../types/types';

export type Action = 
| {
    type: Actions.SET_COLUMNID;
    payload: string,
} 
| {
    type: Actions.SET_COLUMNTITLE;
    payload: string,
} 
| {
    type: Actions.SET_COLUMNLIST;
    payload: ColumnItemType[],
} 
| {
    type: Actions.SET_TASKID;
    payload: string,
} 
| {
    type: Actions.SET_TASKTITLE;
    payload: string,
} 
| {
    type: Actions.SET_TASKDESCR;
    payload: string,
} 
| {
    type: Actions.SET_TASKLIST;
    payload: ITask[],
} 