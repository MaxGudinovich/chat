import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { isAccessTokenValid } from './isAccessTokenValid';
import { isRefreshTokenValid } from './isRefreshTokenValid';
import { refreshTokens } from './refreshTokens';

const getAccessToken = (): string | null => {
  return localStorage.getItem('access');
};

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = getAccessToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const requestWithTokenValidation = async <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  try {
    if (await isAccessTokenValid()) {
      const response = await api.request<T>(config);
      return response;
    }

    if (await isRefreshTokenValid()) {
      await refreshTokens();

      const response = await api.request<T>(config);
      return response;
    }

    throw new Error('Refresh token is invalid');
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === 'Refresh token is invalid'
    ) {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
    }

    throw error;
  }
};
