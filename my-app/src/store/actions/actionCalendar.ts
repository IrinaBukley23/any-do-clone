import { ITaskCalendarCreate } from './../../types/types'
import { calendarTasksApi } from './../reducers/calendarReducer'
import { TaskCalendarItemType } from '../../types/types'

import { Dispatch } from '@reduxjs/toolkit'
import { calendarActions } from '../reducers/calendarReducer'
import { TypeStatusTask } from '../../types/enum'
import moment from 'moment'

const refreshLists = (key: string) => async (dispatch: Dispatch) => {
  try {
    const tasks = await calendarTasksApi.getTasks(key)
    // const data = await calendarTasksApi.getProjects(key)
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
    const newTask = {
      performDate: date,
      title: taskTitle,
      status: TypeStatusTask.notStart,
    }

    try {
      await calendarTasksApi.createTask(key, newTask)
    } catch (err) {
      console.log(err)
    }
    dispatch<any>(refreshLists(key))
  }

export const deleteTask = (id: number, key: string | null) => async (dispatch: Dispatch) => {
  if (!key) return
  try {
    await calendarTasksApi.deleteTask(key, id)
  } catch (err) {
    console.error(err)
  }
  dispatch<any>(refreshLists(key))
}

export const changeTask =
  (task: TaskCalendarItemType, key: string | null) => (dispatch: Dispatch) => {
    if (!key) return
    try {
      calendarTasksApi.changeTask(key, task)
    } catch (err) {
      console.error(err)
    }
    // dispatch(calendarActions.changeTask(task))
    dispatch<any>(refreshLists(key))
  }
