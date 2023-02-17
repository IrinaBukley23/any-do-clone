import { getCurrTasks } from './../utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ICalendar, TaskCalendarItemType } from './../../types/types'
import CalendarTasksApi from '../../api/calendarTasksApi'

const today = new Date()

export const initialState: ICalendar = {
  dateCurrent: today.toDateString(),
  taskListAll: [],
  searchString: '',
  taskList: [],
  dateSelectedInPlan: today.toDateString(),
  taskListInPlan: [],
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
    loadTasks: (state, action: PayloadAction<TaskCalendarItemType[]>) => {
      state.taskListAll = action.payload
    },
  },
})
export const { setCurrentDate } = calendarSlice.actions
export const calendarActions = calendarSlice.actions

const calendarReducer = calendarSlice.reducer

export const calendarTasksApi = new CalendarTasksApi()

export default calendarReducer
