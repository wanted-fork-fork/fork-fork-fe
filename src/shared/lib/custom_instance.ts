import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class AuthorizationError extends Error {}

const instance = axios.create({
  baseURL: typeof process !== 'undefined' ? process.env.API_BASE_URL : undefined,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.error(error);
    const { config } = error;

    if (!config.url.includes('refresh-token') && error.response.status === 401) {
      throw new AuthorizationError();
    }
  },
);

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
