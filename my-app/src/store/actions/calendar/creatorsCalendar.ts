import { ActionsCalendar } from '../../../types/enum'
export class CreatorsCalendar {
  static setCurrentDate = (currentDate: Date) => {
    console.log(2, currentDate)

    return {
      type: ActionsCalendar.SET_CURRENTDATE,
      payload: currentDate,
    }
  }
}
