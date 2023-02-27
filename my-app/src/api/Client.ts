import { IError } from '../types/types';

export const BACKEND_BASE_URL = 'https://top-twelve.online:8080/api';

export interface IClientOptions<Body> {
  apiKey?: string;
  body?: Body;
}

export default class Client {
  public async send<Body = never>(method: string, url: string, options: IClientOptions<Body> = {}) {
    const headers: HeadersInit = {};
    let body: string | undefined = undefined;

    if (options.body) {
      headers['Content-Type'] = 'application/json';
      body = JSON.stringify(options.body);
    };

    if (options.apiKey) {
      headers['Api-Key'] = options.apiKey;
    }

    const res = await fetch(`${BACKEND_BASE_URL}${url}`, { method, headers, body });

    if (res.status >= 400) {
      const data: IError = await res.json();
      throw new Error(data.message);
    }

    if (res.status == 204) {
      return;
    }

    return await res.json();
  }
}
