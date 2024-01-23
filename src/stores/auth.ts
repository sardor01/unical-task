import { AuthApi, TokenManager } from '~/api/auth';
import type { LoginRequestBody, User } from '~/api/auth';

interface AuthState {
  isLoading: boolean;
  currentUser: User | null;
  loggedIn: boolean;
}

export const authState = reactive<AuthState>({
  isLoading: false,
  currentUser: null,
  loggedIn: !!TokenManager.getToken(),
});

export const setValues = (data: User) => {
  if (data.token) {
    TokenManager.setToken(data.token);
    delete data.token;
  }
  authState.currentUser = data;
  authState.loggedIn = !!TokenManager.getToken();
};

export const login = async (requestBody: LoginRequestBody, onSuccess?: () => void) => {
  authState.isLoading = true;
  try {
    const res = await AuthApi.login(requestBody);
    if (res.status === 200) {
      setValues(res.data);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    authState.isLoading = false;
  }
};

export const logout = () => {
  TokenManager.removeToken();
  authState.currentUser = null;
  authState.loggedIn = false;
};

export const fetchCurrentUser = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const res = await AuthApi.getCurrentUser();
    if (res.status === 200) {
      setValues(res.data);
    }
  } catch (error) {
    console.error(error);
  }
};
