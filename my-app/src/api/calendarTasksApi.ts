import { BACKEND_BASE_URL } from './AuthorizationApi'
import { TaskCalendarItemType, ITaskCalendarCreate } from './../types/types'
import { IError } from '../types/types'

export default class CalendarTasksApi {
  async getTasks(key: string) {
    const res = await fetch(`${BACKEND_BASE_URL}/api/tasks`, {
      method: 'GET',
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
    console.log('getAll', data)
    return data as TaskCalendarItemType[]
  }

  async createTask(key: string, task: ITaskCalendarCreate) {
    const res = await fetch(`${BACKEND_BASE_URL}/api/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': key,
      },
      body: JSON.stringify(task),
    })
    if (res.status >= 400) {
      const data: IError = await res.json()
      throw new Error(data.message)
    }
    const data = await res.json()
    return data as TaskCalendarItemType
  }
  async changeTask(key: string, task: TaskCalendarItemType) {
    const res = await fetch(`${BACKEND_BASE_URL}/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': key,
      },
      body: JSON.stringify(task),
    })
    if (res.status != 200) {
      const data: IError = await res.json()
      throw new Error(data.message)
    }
    const data = await res.json()

    return data as TaskCalendarItemType
  }
  async deleteTask(key: string, id: number) {
    const res = await fetch(`${BACKEND_BASE_URL}/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': key,
      },
    })
    if (res.status != 200) {
      const data: IError = await res.json()
      throw new Error(data.message)
    }
    return await res.json()

    // return data as TaskCalendarItemType
  }
  async getProjects(key: string) {
    const res = await fetch(`${BACKEND_BASE_URL}/api/projects`, {
      method: 'GET',
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

    return data
  }
}
