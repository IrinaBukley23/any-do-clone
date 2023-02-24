import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import ProjectApi from '../../api/projectApi'
import { Project } from '../../types/types'

export const projectApi = new ProjectApi()

export const loadProjects = createAsyncThunk(
  'project/getProjects',
  async (key: string) => await projectApi.getProjects(key),
)

export const createProject = createAsyncThunk(
  'project/createProject',
  async (value: { key: string; name: string }) =>
    await projectApi.createProject(value.key, value.name),
)

export const deleteProject = createAsyncThunk(
  'calendar/deleteProject',
  async (value: { key: string; id: number }) => {
    await projectApi.deleteProject(value.key, value.id)
    return value.id
  },
)

export const changeProject = createAsyncThunk(
  'calendar/changeProject',
  async (value: { key: string; project: Project }) => {
    const project = await projectApi.changeProject(value.key, value.project)
    console.log('changed')
    return project
  },
)

export const projectAdapter = createEntityAdapter<Project>({
  selectId: (project) => project.id,
})
export const projectSelectors = projectAdapter.getSelectors()

export const projectSlice = createSlice({
  name: 'projects',
  initialState: projectAdapter.getInitialState(),
  reducers: {},
  extraReducers(builder) {
    builder.addCase(loadProjects.fulfilled, (state, action) => {
      projectAdapter.setAll(state, action.payload)
    })
    builder.addCase(deleteProject.fulfilled, (state, action) => {
      projectAdapter.removeOne(state, action.payload)
    })
    builder.addCase(createProject.fulfilled, (state, action) => {
      projectAdapter.addOne(state, action.payload)
    })
    builder.addCase(changeProject.fulfilled, (state, action) => {
      projectAdapter.updateOne(state, { id: action.payload.id, changes: action.payload })
    })
  },
})

export const projectActions = projectSlice.actions
const projectReducer = projectSlice.reducer
export default projectReducer
