import moment from 'moment'
import { TaskCalendarItemType } from './../types/types'
export const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  column: {
    columnId: '',
    columnTitle: '',
    columnList: [],
  },
  currentId: '',
  task: {
    taskId: '',
    taskTitle: '',
    taskDescr: '',
    taskList: [],
    currentColumnId: '',
  },
}

export const getCurrTasks = (tasks: TaskCalendarItemType[], date: Date | null) => {
  if (!date) return []
  return [...tasks].filter((task) => moment(task.dateCreate).isSame(date, 'day'))
}
