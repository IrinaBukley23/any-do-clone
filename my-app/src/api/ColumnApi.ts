import Client from './Client';

export interface IColumn {
  id: number;
  title: string;
  ownerId: number;
}

export interface IColumnCreation {
  title: string;
}

export interface IColumnUpdate {
  title: string;
}

export default class ColumnApi {
  public constructor(
    private client: Client
  ) {
  }

  public getAll(): Promise<IColumn[]> {
    return this.client.send('GET', '/columns', {
      apiKey: localStorage.getItem('api-key') ?? undefined
    });
  }

  public getOne(id: number): Promise<IColumn> {
    return this.client.send('GET', `/columns/${id}`, {
      apiKey: localStorage.getItem('api-key') ?? undefined
    });
  }

  public create(columnCreation: IColumnCreation): Promise<IColumn> {
    return this.client.send('POST', '/columns', {
      apiKey: localStorage.getItem('api-key') ?? undefined,
      body: columnCreation,
    });
  }

  public update(id: number, columnUpdate: IColumnUpdate): Promise<IColumn> {
    return this.client.send('PUT', `/columns/${id}`, {
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
