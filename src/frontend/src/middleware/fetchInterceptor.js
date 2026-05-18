import { API_BASE_URL } from '../config.js'

export function setupFetchInterceptor() {
  const originalFetch = window.fetch;
  
  window.fetch = async (url, options = {}) => {
    const token = localStorage.getItem('auth_token');
    
    // Si tenemos token y la URL es hacia nuestra API, inyectamos el Authorization
    if (token && typeof url === 'string' && url.includes(API_BASE_URL)) {
      options.headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
      };
    }
    
    const response = await originalFetch(url, options);
    
    // Si el backend nos rechaza el token (expirado o inválido), forzamos un re-login
    if (response.status === 401 || response.status === 403) {
      localStorage.removeItem('auth_token');
      window.location.href = "http://localhost:3000/login";
    }
    
    return response;
  };
}
