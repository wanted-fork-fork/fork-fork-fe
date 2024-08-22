import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export class AuthorizationError extends Error {}

const instance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL, withCredentials: true });

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
