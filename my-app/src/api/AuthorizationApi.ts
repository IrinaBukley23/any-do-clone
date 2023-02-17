import { IAuthorization, IError, ISession, IUser } from '../types/types';

const BACKEND_BASE_URL = 'http://143.42.31.53:8080';

export default class AuthorizationApi {
  async register(user: IUser): Promise<IUser> {
    const res = await fetch(`${BACKEND_BASE_URL}/api/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    });

    if (res.status >= 400) {
      const data: IError = await res.json();
      throw new Error(data.message);
    }

    const data = await res.json();
    console.log(data);
    return data;
  }

  async login(authorization: IAuthorization): Promise<ISession> {
    const res = await fetch(`${BACKEND_BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(authorization)
    });

    if (res.status >= 400) {
      const data: IError = await res.json();
      throw new Error(data.message);
    }

    const data = await res.json();
    console.log(data);
    return data;
  }

  async logout(key: string) {
    const res = await fetch(`${BACKEND_BASE_URL}/api/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': key,
      }
    });

    if (res.status >= 400) {
      const data: IError = await res.json();
      throw new Error(data.message);
    }
    const data = await res.json();
    console.log(data);
    return data;
  }
}
