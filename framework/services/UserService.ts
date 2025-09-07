import client from './client.js';
import config from '../config/configBookstore.js';
import supertest from 'supertest';

interface ApiResponse {
  headers: Record<string, string>;
  status: number;
  data: any;
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

const getUser = async ({ userId, token }: any): Promise<ApiResponse> => {
  const response = await client.get(`/Account/v1/User/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    headers: transformHeaders(response.headers),
    status: response.status,
    data: response.data,
  };
};

const removeUser = async ({ userId, token }: any) => {
  const response = await supertest(config.baseURL)
    .delete(`/Account/v1/User/${userId}`)
    .set('Authorization', `Bearer ${token}`);
  return {
    headers: response.headers,
    status: response.status,
    data: response.body,
  };
};

const createUser = async ({ userName, password }: any): Promise<ApiResponse> => {
  const response = await client.post(`/Account/v1/User`, {
    userName,
    password,
  });

  return {
    headers: transformHeaders(response.headers),
    status: response.status,
    data: response.data,
  };
};

export default {
  get: getUser,
  create: createUser,
  remove: removeUser,
};
