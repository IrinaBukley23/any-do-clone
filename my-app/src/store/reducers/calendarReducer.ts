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

const today = new Date()

// const refreshLists = () => async (dispatch: Dispatch) => {
//   dispatch(calendarActions.getCurrTasks())
//   dispatch(calendarActions.getListInPlan())
// }

// export const setCurrDate = (date: string) => async (dispatch: Dispatch) => {
//   dispatch(calendarActions.setCurrentDate(date))
//   dispatch(calendarActions.setDateSelectedInPlan(date))
// }

// export const getSearchedList = (findText: string) => (dispatch: Dispatch) => {
//   if (!findText) dispatch(calendarActions.getCurrTasks())
//   else {
//     dispatch(calendarActions.filterCurrTasks(findText))
//   }
// }

// export const setDateSelectedInPlan = (date: string) => (dispatch: Dispatch) => {
//   dispatch(calendarActions.setDateSelectedInPlan(date))
//   dispatch(calendarActions.getListInPlan())
// }

export const loadTasks = createAsyncThunk(
  'calendar/getTasks',
  async (key: string) => await calendarTasksApi.getTasks(key),
)
// export const createTask = createAsyncThunk(
//   'calendar/createTask',
//   async (key: string, task: ITaskCalendarCreate) => await calendarTasksApi.createTask(key, task),
// )
// export const changeTask = createAsyncThunk(
//   'calendar/changeTask',
//   async (key: string, task: TaskCalendarItemType) => await calendarTasksApi.changeTask(key, task),
// )
// export const deleteTask = createAsyncThunk(
//   'calendar/deleteTask',
//   async (key: string, id: number) => await calendarTasksApi.deleteTask(key, id),
// )

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

// export const initialState: ICalendar = {
//   dateCurrent: today.toDateString(),
//   taskListAll: [],
//   searchString: '',
//   taskList: [],
//   dateSelectedInPlan: today.toDateString(),
//   taskListInPlan: [],
// }

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: calendarAdapter.getInitialState({
    dateCurrent: today.toDateString(),
    searchString: '',
    dateSelectedInPlan: today.toDateString(),
    // taskListInPlan: [],
    // taskList: [],
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
  },
})
// export const { setCurrentDate } = calendarSlice.actions
export const calendarActions = calendarSlice.actions

const calendarReducer = calendarSlice.reducer

export const calendarTasksApi = new CalendarTasksApi()

export default calendarReducer
