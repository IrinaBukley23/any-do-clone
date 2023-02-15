import { Actions } from '../../types/enum'
import { ColumnItemType, TaskItemType } from '../../types/types'

export const setColumnId = (columnId: string) => ({
  type: Actions.SET_COLUMNID,
  payload: columnId,
})

export const setColumnTitle = (columnTitle: string) => ({
  type: Actions.SET_COLUMNTITLE,
  payload: columnTitle,
})

export const setColumnList = (columnList: ColumnItemType[]) => ({
  type: Actions.SET_COLUMNLIST,
  payload: columnList,
})

export const editColumnTitle = (columnId: string, columnTitle: string) => ({
  type: Actions.EDIT_COLUMNTITLE,
  payload: {
    columnId,
    columnTitle,
  },
})

export const setRemoveColumn = (columnTitle: string) => ({
  type: Actions.REMOVE_COLUMN,
  payload: columnTitle,
})

export const sortColumnList = (columnList: ColumnItemType[], columnDrop: ColumnItemType, columnDrag: ColumnItemType) => ({
  type: Actions.SORT_COLUMN_LIST,
  payload: {
    columnList,
    columnDrop,
    columnDrag
  },
})

export const setTaskId = (taskId: string) => ({
  type: Actions.SET_TASKID,
  payload: taskId,
})

export const setCurrentId = (currentId: string) => ({
  type: Actions.SET_CURRENTID,
  payload: currentId,
})

export const setTaskTitle = (taskTitle: string) => ({
  type: Actions.SET_TASKTITLE,
  payload: taskTitle,
})

export const setTaskDescr = (taskDescr: string) => ({
  type: Actions.SET_TASKDESCR,
  payload: taskDescr,
})

export const setTaskList = (taskList: TaskItemType[]) => ({
  type: Actions.SET_TASKLIST,
  payload: taskList,
})

export const setCurrentColumnId = (currentColumnId: string) => ({
  type: Actions.SET_CURRENTCOLUMNID,
  payload: currentColumnId,
})

export const editTaskTitle = (taskId: string, taskTitle: string) => ({
  type: Actions.EDIT_TASKTITLE,
  payload: {
    taskId,
    taskTitle,
  },
})

export const editTaskDescr = (taskId: string, taskDescr: string) => ({
  type: Actions.EDIT_TASKDESCR,
  payload: {
    taskId,
    taskDescr,
  },
})

export const setRemoveTask = (taskId: string) => ({
  type: Actions.REMOVE_TASK,
  payload: taskId,
})
