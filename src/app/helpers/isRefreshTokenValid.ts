import { jwtDecode } from 'jwt-decode';

const getRefreshToken = (): string | null => {
  return localStorage.getItem('refresh');
};

export const isRefreshTokenValid = async (): Promise<boolean> => {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return false;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const decodedToken: any = jwtDecode(refreshToken);
  return decodedToken.exp > currentTime;
};
