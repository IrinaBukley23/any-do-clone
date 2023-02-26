import { Actions } from '../../types/enum'
import { ColumnItemType, TaskItemType } from '../../types/types'

export type Action =
  | {
      type: Actions.SET_COLUMN_ID
      payload: string
    }
  | {
      type: Actions.SET_COLUMN_TITLE
      payload: string
    }
  | {
      type: Actions.SET_COLUMN_LIST
      payload: ColumnItemType[]
    }
  | {
      type: Actions.EDIT_COLUMN_TITLE
      payload: {
        columnId: string
        columnTitle: string
      }
    }
  | {
      type: Actions.REMOVE_COLUMN
      payload: string
    }
  | {
    type: Actions.SORT_COLUMN_LIST
    payload: {
      columnList: ColumnItemType[],
      columnDrag: ColumnItemType,
      columnDrop: ColumnItemType,
    }
  }
  | {
    type: Actions.SET_CURRENT_ID
    payload: string
  }
  | {
      type: Actions.SET_TASK_ID
      payload: string
    }
  | {
      type: Actions.SET_TASK_TITLE
      payload: string
    }
  | {
      type: Actions.SET_TASK_DESCR
      payload: string
    }
  | {
      type: Actions.SET_TASK_LIST
      payload: TaskItemType[]
    }
  | {
      type: Actions.EDIT_TASK_TITLE
      payload: {
        taskId: string
        taskTitle: string
      }
    }
  | {
      type: Actions.EDIT_TASK_DESCR
      payload: {
        taskId: string
        taskDescr: string
      }
    }
  | {
      type: Actions.REMOVE_TASK
      payload: string
    }
    | {
      type: Actions.SET_CURRENT_COLUMN_ID
      payload: string
    }
    | {
      type: Actions.SORT_TASK_LIST
      payload: {
        taskList: TaskItemType[],
        taskDrag: TaskItemType,
        taskDrop: TaskItemType,
      }
    }
    | {
      type: Actions.SET_LANG
      payload: string
    }
