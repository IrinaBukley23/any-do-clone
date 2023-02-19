import { ITaskCalendarCreate } from './../../types/types'
import { calendarTasksApi } from './../reducers/calendarReducer'
import { TaskCalendarItemType } from '../../types/types'

import { Dispatch } from '@reduxjs/toolkit'
import { calendarActions } from '../reducers/calendarReducer'
import { TypeStatusTask } from '../../types/enum'

const refreshLists = (key: string) => async (dispatch: Dispatch) => {
  console.log(111)
  try {
    const tasks = await calendarTasksApi.getTasks(key)
    const data = await calendarTasksApi.getProjects(key)
    console.log('tasks', tasks)
    dispatch(calendarActions.loadTasks(tasks))
  } catch (err) {
    console.log(err)
  }

  dispatch(calendarActions.getCurrTasks())
  dispatch(calendarActions.getListInPlan())
}

export const setCurrDate = (date: string, key: string | null) => async (dispatch: Dispatch) => {
  if (!key) return

  dispatch(calendarActions.setCurrentDate(date))
  dispatch(calendarActions.setDateSelectedInPlan(date))

  dispatch<any>(refreshLists(key))
}
export const getSearchedList = (findText: string) => (dispatch: Dispatch) => {
  if (!findText) dispatch(calendarActions.getCurrTasks())
  else {
    dispatch(calendarActions.filterCurrTasks(findText))
  }
}

export const setDateSelectedInPlan = (date: string) => (dispatch: Dispatch) => {
  dispatch(calendarActions.setDateSelectedInPlan(date))
  dispatch(calendarActions.getListInPlan())
}

export const createTask =
  (taskTitle: string, date: string, key: string | null) => async (dispatch: Dispatch) => {
    if (!key) return
    const newTask: ITaskCalendarCreate = {
      performDate: date,
      title: taskTitle,
      status: TypeStatusTask.notStart,
    }
    try {
      await calendarTasksApi.createTask(key, newTask)
    } catch (err) {
      console.log(err)
    }
    setCurrDate(date, key)
    // dispatch(calendarActions.createTask(newTask))
    // dispatch(calendarActions.getCurrTasks())
    // dispatch(calendarActions.getListInPlan())
  }

export const deleteTask = (id: number) => (dispatch: Dispatch) => {
  dispatch(calendarActions.deleteTask(id))
  dispatch(calendarActions.getCurrTasks())
  dispatch(calendarActions.getListInPlan())
}

export const changeTask = (task: TaskCalendarItemType) => (dispatch: Dispatch) => {
  dispatch(calendarActions.changeTask(task))
  dispatch(calendarActions.getCurrTasks())
  dispatch(calendarActions.getListInPlan())
}
