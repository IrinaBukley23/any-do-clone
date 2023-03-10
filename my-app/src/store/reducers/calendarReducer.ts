import { getCurrTasks } from './../utils'
import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'
import { TaskCalendarItemType, ITaskCalendarCreate } from './../../types/types'
import CalendarTasksApi from '../../api/calendarTasksApi'
import { TypeStatusCommon } from '../../types/enum'
import moment from 'moment'

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
export const loadTasks = createAsyncThunk(
  'calendar/getTasks',
  async (key: string) => await calendarTasksApi.getTasks(key),
)

export const createTask = createAsyncThunk(
  'calendar/createTask',
  async (value: CreateTaskValue) => {
    const newTask: ITaskCalendarCreate = {
      title: value.title,
      performDate: value.date,
      status: TypeStatusCommon.notStart,
    }

    const createdTask = await calendarTasksApi.createTask(value.key, newTask)
    return createdTask
  },
)
export const changeTask = createAsyncThunk('calendar/changeTask', async (value: ChangeValue) => {
  const task = await calendarTasksApi.changeTask(value.key, value.task)
  return task
})

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
  [
    calendarSelectors.selectAll,
    (state) => state.dateCurrent,
    (state) => state.searchString,
    (state) => state.project,
    (state) => state.status,
    (state) => state.tag,
  ],

  (entities, dateCurrent, filter, project, status, tag) => {
    let byDate = getCurrTasks(entities, new Date(dateCurrent))
    if (project) byDate = byDate.filter((task) => task.projectId == project)
    if (status) byDate = byDate.filter((task) => task.status == status)
    else
      byDate = byDate.filter(
        (task) => task.status != TypeStatusCommon.cancel && task.status != TypeStatusCommon.done,
      )
    if (tag) byDate = byDate.filter((task) => task.tag == tag)
    if (!filter) return byDate
    return byDate.filter((task) => task.title.toLowerCase().includes(filter.toLowerCase()))
  },
)

export const getTaskListPlan = createSelector(
  [calendarSelectors.selectAll, (state) => state.dateSelectedInPlan],
  (entities, dateCurrent) => {
    return getCurrTasks(entities, new Date(dateCurrent)).filter(
      (task) => task.status != TypeStatusCommon.cancel && task.status != TypeStatusCommon.done,
    )
  },
)
export const getTaskListAll = createSelector([calendarSelectors.selectAll], (entities) => {
  return entities.filter(
    (task) => task.status != TypeStatusCommon.cancel && task.status != TypeStatusCommon.done,
  )
})

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: calendarAdapter.getInitialState({
    dateCurrent: today,
    searchString: '',
    dateSelectedInPlan: today,
    project: null,
    status: null,
    tag: null,
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
    setProject: (state, action) => {
      state.project = action.payload
    },
    setStatus: (state, action) => {
      state.status = action.payload
    },
    setTag: (state, action) => {
      state.tag = action.payload
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
      calendarAdapter.updateOne(state, { id: action.payload.id, changes: action.payload })
    })
  },
})
export const calendarActions = calendarSlice.actions

const calendarReducer = calendarSlice.reducer

export const calendarTasksApi = new CalendarTasksApi()

export default calendarReducer
