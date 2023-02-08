import { IAuthorization, IError, ISession, IUser } from '../types/types';

const BACKEND_BASE_URL = 'http://localhost:8080';

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

    return await res.json();
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

    return await res.json();
  }
}