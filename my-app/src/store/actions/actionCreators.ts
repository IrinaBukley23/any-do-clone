import { Actions } from '../../types/enum'
import { ColumnItemType, TaskItemType } from '../../types/types'

export const setColumnId = (columnId: string) => ({
  type: Actions.SET_COLUMN_ID,
  payload: columnId,
})

export const setColumnTitle = (columnTitle: string) => ({
  type: Actions.SET_COLUMN_TITLE,
  payload: columnTitle,
})

export const setColumnList = (columnList: ColumnItemType[]) => ({
  type: Actions.SET_COLUMN_LIST,
  payload: columnList,
})

export const editColumnTitle = (columnId: string, columnTitle: string) => ({
  type: Actions.EDIT_COLUMN_TITLE,
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
  type: Actions.SET_TASK_ID,
  payload: taskId,
})

export const setCurrentId = (currentId: string) => ({
  type: Actions.SET_CURRENT_ID,
  payload: currentId,
})

export const setTaskTitle = (taskTitle: string) => ({
  type: Actions.SET_TASK_TITLE,
  payload: taskTitle,
})

export const setTaskDescr = (taskDescr: string) => ({
  type: Actions.SET_TASK_DESCR,
  payload: taskDescr,
})

export const setTaskList = (taskList: TaskItemType[]) => ({
  type: Actions.SET_TASK_LIST,
  payload: taskList,
})

export const setCurrentColumnId = (currentColumnId: string) => ({
  type: Actions.SET_CURRENT_COLUMN_ID,
  payload: currentColumnId,
})

export const editTaskTitle = (taskId: string, taskTitle: string) => ({
  type: Actions.EDIT_TASK_TITLE,
  payload: {
    taskId,
    taskTitle,
  },
})

export const editTaskDescr = (taskId: string, taskDescr: string) => ({
  type: Actions.EDIT_TASK_DESCR,
  payload: {
    taskId,
    taskDescr,
  },
})

export const setRemoveTask = (taskId: string) => ({
  type: Actions.REMOVE_TASK,
  payload: taskId,
})

export const sortTaskList = (taskList: TaskItemType[], taskDrop: TaskItemType, taskDrag: TaskItemType) => ({
  type: Actions.SORT_TASK_LIST,
  payload: {
    taskList,
    taskDrop,
    taskDrag,
  },
})

export const setLang = (lang: string) => ({
  type: Actions.SET_LANG,
  payload: lang,
})