import { ICalendar, TaskCalendarItemType } from './../types/types'
import moment from 'moment'

export const initialState = {
  token: localStorage.getItem('token'),
  user: null,
  column: {
    columnId: '',
    columnTitle: '',
    columnList: [],
  },
  task: {
    taskId: '',
    taskTitle: '',
    taskDescr: '',
    taskList: [],
  },
}

const tasks: TaskCalendarItemType[] = [
  {
    id: 1,
    title: 'Task1',
    // description: 'Description1',
    // people: [],
    // date: moment('2023-03-06 15:30').toDate(),
    dateCreate: moment('2023-03-06 15:30').toDate(),
  },
  {
    id: 2,
    title: 'Task2',
    // description: 'Description2',
    // people: [],
    // date: moment('2023-03-06 12:30').toDate(),
    dateCreate: moment('2023-03-07 15:30').toDate(),
  },
  {
    id: 3,
    title: 'Task3',
    // description: 'Description3',
    // people: [],
    dateCreate: moment('2023-03-06 15:30').toDate(),
  },
]
export const initialStateCalendar: ICalendar = { dateCurrent: new Date(), taskList: tasks }
