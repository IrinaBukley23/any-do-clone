import Client from './Client';

export interface IUser {
  id: string,
  name: string,
  email: string
}

export default class UserApi {
  constructor(
    private client: Client
    ) {
  }

  public getAll(): Promise<IUser[]> {
    return this.client.send('GET', '/users', {
      apiKey: localStorage.getItem('api-key') ?? undefined
    })
  }
}