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
  },
  {
    id: 2,
    title: 'Task2',
    // description: 'Description2',
    // people: [],
    // date: moment('2023-03-06 12:30').toDate(),
    dateCreate: '2023-02-07 17:00',
  },
  {
    id: 3,
    title: 'Task3',
    // description: 'Description3',
    // people: [],
    dateCreate: '2023-02-09 15:30',
  },
]

const getCurrTasks = (tasks: TaskCalendarItemType[], date: Date | null) => {
  if (!date) return []
  return [...tasks].filter((task) => moment(task.dateCreate).isSame(date, 'day'))
}
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
      state.taskList = getCurrTasks(state.taskListAll, moment(action.payload).toDate())
      state.searchString = ''
    },
    setDateSelectedInPlan: (state, action: PayloadAction<string>) => {
      state.dateSelectedInPlan = action.payload
      state.taskListInPlan = getCurrTasks(tasks, new Date(state.dateSelectedInPlan))
    },
    setSearchString: (state, action: PayloadAction<string>) => {
      const findText = action.payload
      state.searchString = findText
      if (!findText)
        state.taskList = getCurrTasks(state.taskListAll, moment(action.payload).toDate())
      else {
        state.taskList = state.taskList.filter((task) =>
          task.title.toLowerCase().includes(state.searchString.toLowerCase()),
        )
      }
    },
    createTask: (state, action: PayloadAction<string>) => {
      const newTask: TaskCalendarItemType = {
        dateCreate: state.dateCurrent,
        title: action.payload,
        id: Number(new Date()),
      }

      state.taskListAll.push(newTask)

      state.taskList = getCurrTasks(state.taskListAll, new Date(state.dateCurrent))

      state.taskListInPlan = getCurrTasks(state.taskListAll, new Date(state.dateSelectedInPlan))
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.taskListAll = state.taskListAll.filter((task) => task.id !== action.payload)
      state.taskList = getCurrTasks(state.taskListAll, new Date(state.dateCurrent))
      if (moment(state.dateCurrent).isSame(state.dateSelectedInPlan, 'day'))
        state.taskListInPlan = getCurrTasks(state.taskListAll, new Date(state.dateSelectedInPlan))
    },
  },
})
export const { setCurrentDate } = calendarSlice.actions
export const calendarActions = calendarSlice.actions
// export const dateCurrent=(state:RootState)
const calendarReducer = calendarSlice.reducer

export default calendarReducer
