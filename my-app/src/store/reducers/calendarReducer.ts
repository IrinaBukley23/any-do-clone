import { RootState } from './../store'
import { getCurrTasks } from './../utils'
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  Dispatch,
  createSelector,
} from '@reduxjs/toolkit'
import { ICalendar, TaskCalendarItemType, ITaskCalendarCreate, State } from './../../types/types'
import CalendarTasksApi from '../../api/calendarTasksApi'

export const loadTasks = createAsyncThunk(
  'calendar/getTasks',
  async (key: string) => await calendarTasksApi.getTasks(key),
)

const today = new Date()
type DeleteTaskValue = {
  key: string
  id: number
}
// export const createTask = createAsyncThunk(
//   'calendar/createTask',
//   async (key: string, task: ITaskCalendarCreate) => await calendarTasksApi.createTask(key, task),
// )
// export const changeTask = createAsyncThunk(
//   'calendar/changeTask',
//   async (key: string, task: TaskCalendarItemType) => await calendarTasksApi.changeTask(key, task),
// )
export const deleteTask = createAsyncThunk(
  'calendar/deleteTask',
  async (value: DeleteTaskValue) => await calendarTasksApi.deleteTask(value.key, value.id),
)

export const calendarAdapter = createEntityAdapter<TaskCalendarItemType>({
  selectId: (task) => task.id,
})

export const calendarSelectors = calendarAdapter.getSelectors()

export const getTaskList = createSelector(
  calendarSelectors.selectAll,
  (state: RootState) => state.calendar.dateSelectedInPlan,
  (entities, dateSelectedInPlan) => {
    return getCurrTasks(entities, new Date(dateSelectedInPlan))
  },
)

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: calendarAdapter.getInitialState({
    dateCurrent: today.toDateString(),
    searchString: '',
    dateSelectedInPlan: today.toDateString(),
  }),
  reducers: {
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.dateCurrent = action.payload
    },

    //   filterCurrTasks: (state, action: PayloadAction<string>) => {
    //     state.taskList = state.taskList.filter((task) =>
    //       task.title.toLowerCase().includes(action.payload.toLowerCase()),
    //     )
    //   },
    setDateSelectedInPlan: (state, action: PayloadAction<string>) => {
      state.dateSelectedInPlan = action.payload
    },
    // getListInPlan: (state) => {
    //   state.taskListInPlan = getCurrTasks(state, new Date(state.dateSelectedInPlan))
    // },
    // //   createTask: (state, action: PayloadAction<TaskCalendarItemType>) => {
    //     state.taskListAll.push(action.payload)
    //   },
    //   deleteTask: (state, action: PayloadAction<number>) => {
    //     calendarAdapter.removeOne
    //   },
    //   changeTask: (state, action: PayloadAction<TaskCalendarItemType>) => {
    //     const searchTask = state.taskListAll.find((task) => task.id === action.payload.id)
    //     if (searchTask) Object.assign(searchTask, action.payload)
    //     else state.taskListAll.push(action.payload)
    //   },
    //   loadTasks: (state, action: PayloadAction<TaskCalendarItemType[]>) => {
    //     state.taskListAll = action.payload
    //   },
  },
  extraReducers(builder) {
    builder.addCase(loadTasks.fulfilled, (state, action: PayloadAction<TaskCalendarItemType[]>) => {
      calendarAdapter.setAll(state, action.payload)
    })
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      calendarAdapter.removeOne(state, action.payload)
    })
  },
})
// export const { setCurrentDate } = calendarSlice.actions
export const calendarActions = calendarSlice.actions

const calendarReducer = calendarSlice.reducer

export const calendarTasksApi = new CalendarTasksApi()

export default calendarReducer
