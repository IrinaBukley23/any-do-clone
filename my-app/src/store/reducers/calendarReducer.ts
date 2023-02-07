import { ICalendar } from './../../types/types'

import { ActionCalendar } from './../actions/calendar/actionCalendarTypes'
import { ActionsCalendar } from '../../types/enum'

import { initialStateCalendar } from './../utils'
export const calendarReducer = (
  state: ICalendar = initialStateCalendar,
  action: ActionCalendar,
) => {
  switch (action.type) {
    case ActionsCalendar.SET_CURRENTDATE: {
      console.log(3, action.payload)
      return {
        ...state,
        dateCurrent: action.payload,
      }
    }

    default:
      return state
  }
}
