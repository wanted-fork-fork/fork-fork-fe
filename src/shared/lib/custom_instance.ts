import axios, { AxiosRequestConfig } from 'axios';
import { refreshToken } from 'src/types';
import { redirectToLoginPage } from 'src/shared/functions/redirectToLoginPage';

const instance = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL, withCredentials: true });

const getAccessToken = () => localStorage?.getItem('accessToken') ?? null;

instance.interceptors.request.use(
  (config) => {
    if (!config.headers) return config;

    let token = null;

    if (!config.url?.includes(`/api/v1/auth/refresh-token`)) {
      token = getAccessToken();
    }

    if (token !== null) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const getRefreshToken = async () => {
  try {
    const token = getAccessToken();
    if (!token) return null;

    const response = await refreshToken({ accessToken: token });

    return response.accessToken;
  } catch (e) {
    return null;
  }
};

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const { config } = error;

    if (config.url.includes('refresh-token') || error.response.status !== 401 || config.sent) {
      redirectToLoginPage();
      return Promise.reject(error);
    }

    config.sent = true;
    const accessToken = await getRefreshToken();

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return axios(config);
  },
);

export const customInstance = <T>(config: AxiosRequestConfig, options?: AxiosRequestConfig): Promise<T> => {
  const promise = instance({
    ...config,
    ...options,
  }).then(({ data }) => data);

  return promise;
};
