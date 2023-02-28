import { ICard, ICardEdit } from '../types/types';
import Client from './Client';

export default class ColumnApi {
  public constructor(
    private client: Client
  ) {
  }

  public async getAll(): Promise<ICard[]> {
    return await this.client.send('GET', '/cards', {
      apiKey: localStorage.getItem('api-key') ?? undefined
    });
  }

  public async getOne(id: number): Promise<ICard> {
    return await this.client.send('GET', `/cards/${id}`, {
      apiKey: localStorage.getItem('api-key') ?? undefined
    });
  }

  public async create(cardCreation: ICardEdit): Promise<ICard> {
    return await this.client.send('POST', '/cards', {
      apiKey: localStorage.getItem('api-key') ?? undefined,
      body: cardCreation,
    });
  }

  public async update(id: number, cardUpdate: ICardEdit): Promise<ICard> {
    return await this.client.send('PUT', `/cards/${id}`, {
      apiKey: localStorage.getItem('api-key') ?? undefined,
      body: cardUpdate,
    });
  }

  public async delete(id: number): Promise<void> {
    await this.client.send('DELETE', `/cards/${id}`, {
      apiKey: localStorage.getItem('api-key') ?? undefined,
    });
  }
}
