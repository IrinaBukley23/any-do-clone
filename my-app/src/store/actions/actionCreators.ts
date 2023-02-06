import { Actions } from '../../types/enum';
import { ColumnItemType, IColumn, ITask } from '../../types/types';


export const setColumnId = (columnId: string) => ({
    type: Actions.SET_COLUMNID,
    payload: columnId,
});

export const setColumnTitle = (columnTitle: string) => ({
    type: Actions.SET_COLUMNTITLE,
    payload: columnTitle,
});

export const setColumnList = (columnList: ColumnItemType[]) => ({
    type: Actions.SET_COLUMNLIST,
    payload: columnList
});

export const setTaskId = (taskId: string) => ({
    type: Actions.SET_TASKID,
    payload: taskId,
});

export const setTaskTitle = (taskTitle: string) => ({
    type: Actions.SET_TASKTITLE,
    payload: taskTitle,
});

export const setTaskDescr = (taskTitle: string) => ({
    type: Actions.SET_TASKTITLE,
    payload: taskTitle,
});

export const setTaskList = (taskList: ITask[]) => ({
    type: Actions.SET_TASKLIST,
    payload: taskList
});