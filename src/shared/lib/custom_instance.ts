import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class AuthorizationError extends Error {}

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig,
): Promise<AxiosResponse<T>> => {
  const promise = axios({
    ...config,
    ...options,
  });

  return promise;
};
