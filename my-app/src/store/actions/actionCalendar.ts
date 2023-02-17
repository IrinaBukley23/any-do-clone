import { calendarTasksApi } from './../reducers/calendarReducer'
import { TaskCalendarItemType } from '../../types/types'

import { Dispatch } from '@reduxjs/toolkit'
import { calendarActions } from '../reducers/calendarReducer'
import { TypeStatusTask } from '../../types/enum'

export const setCurrDate = (date: string, key: string | null) => (dispatch: Dispatch) => {
  if (!key) return

  dispatch(calendarActions.setCurrentDate(date))
  dispatch(calendarActions.setDateSelectedInPlan(date))
  getCurrTasks(key)
  dispatch(calendarActions.getCurrTasks())
  dispatch(calendarActions.getListInPlan())
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

export const createTask = (taskTitle: string, date: string) => (dispatch: Dispatch) => {
  const newTask: TaskCalendarItemType = {
    performDate: date,
    title: taskTitle,
    id: Number(new Date()),
    status: TypeStatusTask.notStart,
  }
  dispatch(calendarActions.createTask(newTask))
  dispatch(calendarActions.getCurrTasks())
  dispatch(calendarActions.getListInPlan())
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

export const getCurrTasks = (key: string) => async (dispatch: Dispatch) => {
  try {
    const tasks = await calendarTasksApi.getTasks(key)
    console.log(tasks)
    dispatch(calendarActions.loadTasks(tasks))
  } catch (err) {
    console.log(err)
  }
}
