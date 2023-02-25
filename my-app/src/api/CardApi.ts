import { ICard, ICardEdit } from '../types/types';
import Client from './Client';

export default class ColumnApi {
  public constructor(
    private client: Client
  ) {
  }

  public async getAll(): Promise<ICard[]> {
    const cards = await this.client.send('GET', '/cards', {
      apiKey: localStorage.getItem('api-key') ?? undefined
    });
    for (const card of cards) {
      card.order = 0
    };
    return cards;
  }

  public async getOne(id: number): Promise<ICard> {
    const card = await this.client.send('GET', `/cards/${id}`, {
      apiKey: localStorage.getItem('api-key') ?? undefined
    });
    card.order = 0;
    return card;
  }

  public async create(cardCreation: ICardEdit): Promise<ICard> {
    const card = await this.client.send('POST', '/cards', {
      apiKey: localStorage.getItem('api-key') ?? undefined,
      body: cardCreation,
    });
    card.order = cardCreation.order;
    return card;
  }

  public async update(id: number, cardUpdate: ICardEdit): Promise<ICard> {
    const card = await this.client.send('PUT', `/cards/${id}`, {
      apiKey: localStorage.getItem('api-key') ?? undefined,
      body: cardUpdate,
    });
    card.order = cardUpdate.order;
    return card;
  }

  public async delete(id: number): Promise<void> {
    await this.client.send('DELETE', `/cards/${id}`, {
      apiKey: localStorage.getItem('api-key') ?? undefined,
    });
  }
}
