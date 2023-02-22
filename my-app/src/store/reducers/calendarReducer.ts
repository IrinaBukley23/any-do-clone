import { RootState } from './../store'
import { getCurrTasks } from './../utils'
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import { TaskCalendarItemType, ITaskCalendarCreate, State } from './../../types/types'
import CalendarTasksApi from '../../api/calendarTasksApi'
import { TypeStatusTask } from '../../types/enum'
import moment from 'moment'
import { getByPlaceholderText } from '@testing-library/react'

export const loadTasks = createAsyncThunk(
  'calendar/getTasks',
  async (key: string) => await calendarTasksApi.getTasks(key),
)

const today = moment(new Date()).hour(0).minute(0).format('YYYY-MM-DD HH:mm')

type DeleteTaskValue = {
  key: string
  id: number
}
type CreateTaskValue = {
  key: string
  title: string
  date: string
}
type ChangeValue = {
  key: string
  task: TaskCalendarItemType
}
export const createTask = createAsyncThunk(
  'calendar/createTask',
  async (value: CreateTaskValue) => {
    const newTask: ITaskCalendarCreate = {
      title: value.title,
      performDate: value.date,
      status: TypeStatusTask.notStart,
    }
    console.log(newTask)

    const createdTask = await calendarTasksApi.createTask(value.key, newTask)
    return createdTask
  },
)
export const changeTask = createAsyncThunk('calendar/changeTask', async (value: ChangeValue) => {
  const task = await calendarTasksApi.changeTask(value.key, value.task)
  console.log('changed')
  return task
})

// export const changeDate= createAsyncThunk('calendar/changeTask', async (value: ChangeValue) => {
//   const task = await calendarTasksApi.changeTask(value.key, value.task)
//   return task
// })

export const deleteTask = createAsyncThunk(
  'calendar/deleteTask',
  async (value: DeleteTaskValue) => {
    await calendarTasksApi.deleteTask(value.key, value.id)
    return value.id
  },
)

export const calendarAdapter = createEntityAdapter<TaskCalendarItemType>({
  selectId: (task) => task.id,
})

export const calendarSelectors = calendarAdapter.getSelectors()

export const getTaskList = createSelector(
  [calendarSelectors.selectAll, (state) => state.dateCurrent, (state) => state.searchString],
  (entities, dateCurrent, filter) => {
    const byDate = getCurrTasks(entities, new Date(dateCurrent))
    console.log({ byDate: byDate, ent: entities, filter: filter })
    if (!filter) return byDate
    return byDate.filter((task) => task.title.toLowerCase().includes(filter.toLowerCase()))
  },
)

// export const getTaskByTime = createSelector([calendarSelectors.selectAll,(state) => state.dateSelectedInPlan],(entities, dateCurrent)=>{})

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: calendarAdapter.getInitialState({
    dateCurrent: today,
    searchString: '',
    dateSelectedInPlan: today,
  }),
  reducers: {
    setCurrentDate: (state, action: PayloadAction<string>) => {
      state.dateCurrent = action.payload
    },
    setDateSelectedInPlan: (state, action: PayloadAction<string>) => {
      state.dateSelectedInPlan = action.payload
    },
    setSearchString: (state, action) => {
      state.searchString = action.payload
    },
  },
  extraReducers(builder) {
    builder.addCase(loadTasks.fulfilled, (state, action: PayloadAction<TaskCalendarItemType[]>) => {
      calendarAdapter.setAll(state, action.payload)
    })
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      calendarAdapter.removeOne(state, action.payload)
    })
    builder.addCase(createTask.fulfilled, (state, action) => {
      calendarAdapter.addOne(state, action.payload)
    })
    builder.addCase(changeTask.fulfilled, (state, action) => {
      console.log('change')
      calendarAdapter.updateOne(state, { id: action.payload.id, changes: action.payload })
    })
  },
})
export const calendarActions = calendarSlice.actions

const calendarReducer = calendarSlice.reducer

export const calendarTasksApi = new CalendarTasksApi()

export default calendarReducer
