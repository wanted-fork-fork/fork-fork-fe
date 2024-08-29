import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { requestRefreshToken } from 'src/app/server/authenticate';

export class AuthorizationError extends Error {}

const instance = axios.create({
  baseURL: typeof process !== 'undefined' ? process.env.API_BASE_URL : undefined,
  withCredentials: true,
});

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (e) => {
    if (e.status !== 401 || e.request.url.includes('refresh') || e.request.config.sent || !e.config) return;

    const accessToken = await requestRefreshToken(e.request);
    e.config.headers.Authorization = `Bearer ${accessToken}`;
    e.config.sent = true;
    return instance(e.config);
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
