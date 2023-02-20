import moment from 'moment'
import { TaskCalendarItemType } from './../types/types'
export const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  column: {
    columnId: '',
    columnTitle: '',
    columnOrder: 0,
    columnList: [],
  },
  currentId: '',
  task: {
    taskId: '',
    taskTitle: '',
    taskDescr: '',
    taskOrder: 0,
    taskList: [],
    currentColumnId: '',
  },
  lang: ''
}

export const getCurrTasks = (tasks: TaskCalendarItemType[], date: Date | null) => {
  if (!date) return []
  return [...tasks].filter((task) => moment(task.dateCreate).isSame(date, 'day'))
}
