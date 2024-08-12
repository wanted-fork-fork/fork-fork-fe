import axios, { AxiosRequestConfig } from 'axios';

export const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const promise = axios({
    ...config,
    ...options,
    baseURL: import.meta.env.VITE_API_BASE_URL,
  }).then(({ data }) => data);

  return promise;
};
