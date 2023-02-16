import { TaskCalendarItemType } from '../../types/types'

import { Dispatch } from '@reduxjs/toolkit'
import { calendarActions } from '../reducers/calendarReducer'
import { TypeStatusTask } from '../../types/enum'

export const setCurrDate = (date: string) => (dispatch: Dispatch) => {
  dispatch(calendarActions.setCurrentDate(date))
  dispatch(calendarActions.setDateSelectedInPlan(date))
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
    dateCreate: date,
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
