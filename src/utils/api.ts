import axios from 'axios';

export const getApi = (ctx?: any) => {
  const api = axios.create({
    baseURL: '',
  })
  return api;
}