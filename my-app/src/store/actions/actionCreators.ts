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

export const setTaskId = (taskId: string) => ({
  type: Actions.SET_TASKID,
  payload: taskId,
})

export const setTaskTitle = (taskTitle: string) => ({
  type: Actions.SET_TASKTITLE,
  payload: taskTitle,
})

export const setTaskDescr = (taskTitle: string) => ({
  type: Actions.SET_TASKTITLE,
  payload: taskTitle,
})

export const setTaskList = (taskList: TaskItemType[]) => ({
  type: Actions.SET_TASKLIST,
  payload: taskList,
})
