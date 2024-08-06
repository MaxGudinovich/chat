import { jwtDecode } from 'jwt-decode';

const getAccessToken = (): string | null => {
  return localStorage.getItem('access');
};

export const isAccessTokenValid = async (): Promise<boolean> => {
  const accessToken = getAccessToken();
  if (!accessToken) {
    return false;
  }

  const currentTime = Math.floor(Date.now() / 1000);
  const decodedToken: any = jwtDecode(accessToken);
  return decodedToken.exp > currentTime;
};
