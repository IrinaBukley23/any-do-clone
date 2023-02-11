import { RootState } from './../store'
import { Dispatch } from '@reduxjs/toolkit'
import { calendarActions } from '../reducers/calendarReducer'

export const setCurrDate = (date: string) => (dispatch: Dispatch) => {
  dispatch(calendarActions.setCurrentDate(date))
  dispatch(calendarActions.setDateSelectedInPlan(date))
  dispatch(calendarActions.getCurrTasks(date))
  dispatch(calendarActions.getListInPlan(date))
}
export const getSearchedList = (findText: string) => (dispatch: Dispatch, state: RootState) => {
  const calendar = state.calendar
  if (!findText) dispatch(calendarActions.getCurrTasks(calendar.dateCurrent))
  else {
    dispatch(calendarActions.filterCurrTasks(findText))
  }
}

// setCurrentDate: (state, action: PayloadAction<string>) => {
//   state.dateCurrent = action.payload
//   state.taskList = getCurrTasks(state.taskListAll, moment(action.payload).toDate())
//   state.searchString = ''
// },
// setDateSelectedInPlan: (state, action: PayloadAction<string>) => {
//   state.dateSelectedInPlan = action.payload
//   state.taskListInPlan = getCurrTasks(tasks, new Date(state.dateSelectedInPlan))
// },
// setSearchString: (state, action: PayloadAction<string>) => {
//   const findText = action.payload
//   state.searchString = findText
//   if (!findText)
//     state.taskList = getCurrTasks(state.taskListAll, moment(action.payload).toDate())
//   else {
//     state.taskList = state.taskList.filter((task) =>
//       task.title.toLowerCase().includes(state.searchString.toLowerCase()),
//     )
//   }
// }

// createTask: (state, action: PayloadAction<string>) => {
//   const newTask: TaskCalendarItemType = {
//     dateCreate: state.dateCurrent,
//     title: action.payload,
//     id: Number(new Date()),
//   }

//   state.taskListAll.push(newTask)

//   state.taskList = getCurrTasks(state.taskListAll, new Date(state.dateCurrent))

//   state.taskListInPlan = getCurrTasks(state.taskListAll, new Date(state.dateSelectedInPlan))
// },
// deleteTask: (state, action: PayloadAction<number>) => {
//   state.taskListAll = state.taskListAll.filter((task) => task.id !== action.payload)
//   state.taskList = getCurrTasks(state.taskListAll, new Date(state.dateCurrent))
//   if (moment(state.dateCurrent).isSame(state.dateSelectedInPlan, 'day'))
//     state.taskListInPlan = getCurrTasks(state.taskListAll, new Date(state.dateSelectedInPlan))
// },
