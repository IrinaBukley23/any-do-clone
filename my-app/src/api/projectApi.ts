import { IError, Project } from './../types/types'
import { BACKEND_BASE_URL } from './AuthorizationApi'

export default class ProjectApi {
  async createProject(key: string, name: string) {
    const res = await fetch(`${BACKEND_BASE_URL}/api/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': key,
      },
      body: JSON.stringify({ name: name }),
    })
    if (res.status >= 400) {
      const data: IError = await res.json()
      throw new Error(data.message)
    }
    const data = await res.json()
    return data as Project
  }
  async changeProject(key: string, project: Project) {
    const res = await fetch(`${BACKEND_BASE_URL}/api/projects/${project.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': key,
      },
      body: JSON.stringify(project),
    })
    if (res.status >= 400) {
      const data: IError = await res.json()
      throw new Error(data.message)
    }
    const data = await res.json()
    return data as Project
  }

  async deleteProject(key: string, id: number) {
    const res = await fetch(`${BACKEND_BASE_URL}/api/projects/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': key,
      },
    })
    if (res.status != 204) {
      const data: IError = await res.json()
      throw new Error(data.message)
    }
  }
  async getProjects(key: string) {
    const res = await fetch(`${BACKEND_BASE_URL}/api/projects`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': key,
      },
    })
    if (res.status >= 400) {
      const data: IError = await res.json()
      throw new Error(data.message)
    }
    const data = await res.json()

    return data as Project[]
  }
}
