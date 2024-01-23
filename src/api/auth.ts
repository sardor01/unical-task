import { httpClient, httpClientWithToken } from './index';
import { useCookies } from '~/plugins/cookies';

const expiresInMins = 60 * 24 * 2;
const expiresInSecs = expiresInMins * 60;

export class TokenManager {
  private static cookieKey = 'token';

  static getToken() {
    return useCookies().cookies.get(this.cookieKey);
  }

  static setToken(token: string) {
    useCookies().cookies.set(this.cookieKey, token, expiresInSecs, '/');
  }

  static removeToken() {
    useCookies().cookies.remove(this.cookieKey);
  }
}

export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token?: string;
}

export interface LoginRequestBody {
  username: string;
  password: string;
}

export class AuthApi {
  static login(requestBody: LoginRequestBody) {
    return httpClient.post<User>('/auth/login', { ...requestBody, expiresInMins });
  }

  static getCurrentUser() {
    return httpClientWithToken.get<User>('/auth/me');
  }
}
