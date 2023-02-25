import { IUser } from '../types/types';
import Client from './Client';

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