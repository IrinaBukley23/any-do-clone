import { TypeStatusTask } from './../../types/enum'
import { createTask } from '../actions/actionCalendar'
import { getCurrTasks } from './../utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICalendar, TaskCalendarItemType } from './../../types/types'
import moment from 'moment'

const tasks: TaskCalendarItemType[] = [
  {
    id: 1,
    title: 'Task1',
    // description: 'Description1',
    // people: [],
    // date: moment('2023-03-06 15:30').toDate(),
    dateCreate: '2023-02-06 11:20',
    status: TypeStatusTask.notStart,
  },
  {
    id: 2,
    title: 'Task2',
    // description: 'Description2',
    // people: [],
    // date: moment('2023-03-06 12:30').toDate(),
    dateCreate: '2023-02-07 17:00',
    status: TypeStatusTask.notStart,
  },
  {
    id: 3,
    title: 'Task3',
    // description: 'Description3',
    // people: [],
    dateCreate: '2023-02-09 15:30',
    status: TypeStatusTask.notStart,
  },
]

const today = new Date()
export const initialState: ICalendar = {
  dateCurrent: today.toDateString(),
  taskListAll: tasks,
  searchString: '',
  taskList: getCurrTasks(tasks, today),
  dateSelectedInPlan: today.toDateString(),
  taskListInPlan: getCurrTasks(tasks, today),
}

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState,
  reducers: {
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.dateCurrent = action.payload
    },
    getCurrTasks: (state) => {
      state.taskList = getCurrTasks(state.taskListAll, new Date(state.dateCurrent))
    },
    filterCurrTasks: (state, action: PayloadAction<string>) => {
      state.taskList = state.taskList.filter((task) =>
        task.title.toLowerCase().includes(action.payload.toLowerCase()),
      )
    },
    setDateSelectedInPlan: (state, action: PayloadAction<string>) => {
      state.dateSelectedInPlan = action.payload
    },
    getListInPlan: (state) => {
      state.taskListInPlan = getCurrTasks(state.taskListAll, new Date(state.dateSelectedInPlan))
    },
    createTask: (state, action: PayloadAction<TaskCalendarItemType>) => {
      state.taskListAll.push(action.payload)
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.taskListAll = state.taskListAll.filter((task) => task.id !== action.payload)
    },
    changeTask: (state, action: PayloadAction<TaskCalendarItemType>) => {
      const searchTask = state.taskListAll.find((task) => task.id === action.payload.id)
      if (searchTask) Object.assign(searchTask, action.payload)
      else state.taskListAll.push(action.payload)
    },
  },
})
export const { setCurrentDate } = calendarSlice.actions
export const calendarActions = calendarSlice.actions
// export const dateCurrent=(state:RootState)
const calendarReducer = calendarSlice.reducer

export default calendarReducer
