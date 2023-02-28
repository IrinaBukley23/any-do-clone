import { IColumn, IColumnCreation, IColumnUpdate } from '../types/types';
import Client from './Client';
export default class ColumnApi {
  public constructor(
    private client: Client
  ) {
  }

  public async getAll(): Promise<IColumn[]> {
    return await this.client.send('GET', '/columns', {
      apiKey: localStorage.getItem('api-key') ?? undefined
    });
  }

  public async getOne(id: number): Promise<IColumn> {
    return await this.client.send('GET', `/columns/${id}`, {
      apiKey: localStorage.getItem('api-key') ?? undefined
    });
  }

  public async create(columnCreation: IColumnCreation): Promise<IColumn> {
    return await this.client.send('POST', '/columns', {
      apiKey: localStorage.getItem('api-key') ?? undefined,
      body: columnCreation,
    });
  }

  public async update(id: number, columnUpdate: IColumnUpdate): Promise<IColumn> {
    return await this.client.send('PUT', `/columns/${id}`, {
      apiKey: localStorage.getItem('api-key') ?? undefined,
      body: columnUpdate,
    });
  }

  public delete(id: number): Promise<void> {
    return this.client.send('DELETE', `/columns/${id}`, {
      apiKey: localStorage.getItem('api-key') ?? undefined,
    });
  }
}
