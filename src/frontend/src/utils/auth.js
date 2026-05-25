import { ref } from 'vue';

// Estado global y reactivo del login
export const isAuthenticated = ref(!!localStorage.getItem('auth_token'));

export function setToken(token) {
  localStorage.setItem('auth_token', token);
  isAuthenticated.value = true;
}

export function clearToken() {
  localStorage.removeItem('auth_token');
  isAuthenticated.value = false;
}
