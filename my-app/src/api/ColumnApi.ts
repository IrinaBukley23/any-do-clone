import { IColumn, IColumnCreation, IColumnUpdate } from '../types/types';
import Client from './Client';
export default class ColumnApi {
  public constructor(
    private client: Client
  ) {
  }

  public async getAll(): Promise<IColumn[]> {
    const columns = await this.client.send('GET', '/columns', {
      apiKey: localStorage.getItem('api-key') ?? undefined
    });
    for (const column of columns) {
      column.order = 0
    };
    return columns;
  }

  public async getOne(id: number): Promise<IColumn> {
    const column = await this.client.send('GET', `/columns/${id}`, {
      apiKey: localStorage.getItem('api-key') ?? undefined
    });
    column.order = 0;
    return column;
  }

  public async create(columnCreation: IColumnCreation): Promise<IColumn> {
    const column = await this.client.send('POST', '/columns', {
      apiKey: localStorage.getItem('api-key') ?? undefined,
      body: columnCreation,
    });
    column.order = columnCreation.order;
    return column;
  }

  public async update(id: number, columnUpdate: IColumnUpdate): Promise<IColumn> {
    const column = await this.client.send('PUT', `/columns/${id}`, {
      apiKey: localStorage.getItem('api-key') ?? undefined,
      body: columnUpdate,
    });
    column.order = columnUpdate.order;
    return column;
  }

  public delete(id: number): Promise<void> {
    return this.client.send('DELETE', `/columns/${id}`, {
      apiKey: localStorage.getItem('api-key') ?? undefined,
    });
  }
}
