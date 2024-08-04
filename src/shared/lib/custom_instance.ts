import Axios, { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

const instance = Axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = import.meta.env.VITE_DEV_JWT_TOKEN;
  try {
    if (config.headers && accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  } catch (e) {
    console.error('[axios]', e);
  }
  return config;
});

export const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const promise = instance({
    ...config,
    ...options,
  }).then(({ data }) => data);

  return promise;
};
