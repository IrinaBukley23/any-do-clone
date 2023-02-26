import moment, { Moment } from 'moment'
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

const roundMin = (date: string) =>
  moment(date).minute() >= 30 ? moment(date).minute(30).second(0) : moment(date).minute(0).second(0)

export const getCurrTasks = (tasks: TaskCalendarItemType[], date: Date | null) => {
  if (!date) return []
  return [...tasks].filter((task) => moment(task.performDate).isSame(date, 'day'))
}

export const getTaskByTime = (tasks: TaskCalendarItemType[], rowTime: Moment) => {
  return [...tasks].filter((task) => {
    const round = roundMin(task.performDate).utc()

    return rowTime.minutes() == round.minutes() && rowTime.hours() == round.hours()
  })
}
