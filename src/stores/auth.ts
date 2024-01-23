import { AuthApi, TokenManager } from '~/api/auth';
import type { LoginRequestBody, User } from '~/api/auth';

interface AuthStore {
  isLoading: boolean;
  currentUser: User | null;
  loggedIn: boolean;
}

export const authStore = reactive<AuthStore>({
  isLoading: false,
  currentUser: null,
  loggedIn: !!TokenManager.getToken(),
});

export const setValues = (data: User) => {
  if (data.token) {
    TokenManager.setToken(data.token);
    delete data.token;
  }
  authStore.currentUser = data;
  authStore.loggedIn = !!TokenManager.getToken();
};

export const login = async (requestBody: LoginRequestBody, onSuccess?: () => void) => {
  authStore.isLoading = true;
  try {
    const res = await AuthApi.login(requestBody);
    if (res.status === 200 && res.data) {
      setValues(res.data);
      if (typeof onSuccess === 'function') {
        onSuccess();
      }
    }
  } catch (error) {
    console.error(error);
  } finally {
    authStore.isLoading = false;
  }
};

export const logout = () => {
  TokenManager.removeToken();
  authStore.currentUser = null;
  authStore.loggedIn = false;
};

export const fetchCurrentUser = async () => {
  try {
    const res = await AuthApi.getCurrentUser();
    if (res.status === 200 && res.data) {
      setValues(res.data);
    }
  } catch (error) {
    console.error(error);
  }
};
