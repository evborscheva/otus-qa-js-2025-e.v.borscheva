import supertest from 'supertest';
import config from '../config/configBookstore';
import client from './client.js';

interface ApiResponse {
  headers: Record<string, string>;
  status: number;
  data: any;
}
interface ReplaceBookParams {
  userId: string;
  fromIsbn: string;
  toIsbn: string;
  token: string;
}
const transformHeaders = (headers: any): Record<string, string> => {
  const result: Record<string, string> = {};

  for (const key in headers) {
    if (headers.hasOwnProperty(key)) {
      result[key] = String(headers[key]);
    }
  }

  return result;
};

const replaceBook = async ({ userId, fromIsbn, toIsbn, token }: ReplaceBookParams): Promise<ApiResponse> => {
  const response = await client.put(
    `/BookStore/v1/Books/${fromIsbn}`,
    {
      userId,
      isbn: toIsbn,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return {
    headers: transformHeaders(response.headers),
    status: response.status,
    data: response.data,
  };
};

const addListOfBooks = async ({ userId, isbns, token }: any): Promise<ApiResponse> => {
  const payload = {
    userId,
    collectionOfIsbns: isbns.map((isbn: any) => ({
      isbn,
    })),
  };

  const response = await supertest(config.baseURL)
    .post(`/BookStore/v1/Books`)
    .set('Authorization', `Bearer ${token}`)
    .set('Accept', 'application/json')
    .send(payload);
  return {
    headers: response.headers,
    status: response.status,
    data: response.body,
  };
};

const removeBook = async ({ isbn, userId, token }: any) => {
  const response = await fetch(`${config.baseURL}/BookStore/v1/Book`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ isbn, userId }),
  });

  return {
    headers: response.headers,
    status: response.status,
    data: response.status === 204 ? {} : await response.json(),
  };
};

const getBook = async (isbn: any): Promise<ApiResponse> => {
  const response = await client.get('/BookStore/v1/Book', {
    params: {
      ISBN: isbn,
    },
  });

  return {
    headers: transformHeaders(response.headers),
    status: response.status,
    data: response.data,
  };
};

const removeAllBooks = async ({ userId, token }: any): Promise<ApiResponse> => {
  const response = await supertest(config.baseURL)
    .delete(`/BookStore/v1/Books?UserId=${userId}`)
    .set('Authorization', `Bearer ${token}`);
  return {
    headers: response.headers,
    status: response.status,
    data: response.status === 204 ? {} : await response.body,
  };
};

export default {
  getBook,
  replace: replaceBook,
  addList: addListOfBooks,
  remove: removeBook,
  removeAll: removeAllBooks,
};