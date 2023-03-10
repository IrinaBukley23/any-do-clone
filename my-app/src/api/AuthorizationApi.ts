import { IAuthorization, IError, IRegistration, ISession, IUser } from '../types/types';

export const BACKEND_BASE_URL = 'https://top-twelve.online:8080'

export default class AuthorizationApi {
  async register(user: IRegistration): Promise<IUser> {
    const res = await fetch(`${BACKEND_BASE_URL}/api/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    if (res.status >= 400) {
      const data: IError = await res.json()
      throw new Error(data.message)
    }

    const data = await res.json()
    return data
  }

  async login(authorization: IAuthorization): Promise<ISession> {
    const res = await fetch(`${BACKEND_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authorization),
    })

    if (res.status >= 400) {
      const data: IError = await res.json()
      throw new Error(data.message)
    }

    const data = await res.json()
    return data
  }

  async logout(key: string) {
    const res = await fetch(`${BACKEND_BASE_URL}/api/logout`, {
      method: 'POST',
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
    return data
  }
}
