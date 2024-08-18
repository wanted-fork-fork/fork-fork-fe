import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL, withCredentials: true });

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const promise = instance({
    ...config,
    ...options,
  });

  return promise;
};
