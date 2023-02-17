import { BACKEND_BASE_URL } from './AuthorizationApi'
import { TaskCalendarItemType } from './../types/types'
import { IError } from '../types/types'

export default class CalendarTasksApi {
  async getTasks(key: string) {
    // const tasks: TaskCalendarItemType[] = []
    const res = await fetch(`${BACKEND_BASE_URL}/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': key,
      },
    })
    if (res.status != 200) {
      const data: IError = await res.json()
      throw new Error(data.message)
    }
    const data = await res.json()
    console.log(11111, data)

    return data as TaskCalendarItemType[]
  }
}
