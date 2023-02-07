import { ActionsCalendar } from './../../../types/enum'
export type ActionCalendar = {
  type: ActionsCalendar.SET_CURRENTDATE
  payload: Date
}
