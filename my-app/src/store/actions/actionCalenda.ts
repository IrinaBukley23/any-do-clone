import { TaskCalendarItemType } from './../../types/types'
import { RootState } from './../store'
import { Dispatch } from '@reduxjs/toolkit'
import { calendarActions } from '../reducers/calendarReducer'

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
// deleteTask: (state, action: PayloadAction<number>) => {
//   state.taskListAll = state.taskListAll.filter((task) => task.id !== action.payload)
//   state.taskList = getCurrTasks(state.taskListAll, new Date(state.dateCurrent))
//   if (moment(state.dateCurrent).isSame(state.dateSelectedInPlan, 'day'))
//     state.taskListInPlan = getCurrTasks(state.taskListAll, new Date(state.dateSelectedInPlan))
// },