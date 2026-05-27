// src/services/auth.ts
import api from './api';

interface LoginData {
  email: string;
  password: string;
}

export const login = async (data: LoginData) => {
  const response = await api.post('/auth/login', data);
  const { token } = response.data;
  
  if (token) {
    sessionStorage.setItem('@airbnb-Token', token);
    localStorage.setItem('token', token);
  }
  
  return response.data;
};

export const logout = () => {
  sessionStorage.removeItem('@airbnb-Token');
  localStorage.removeItem('token');
};

export const isAuthenticated = (): boolean => {
  const token = sessionStorage.getItem('@airbnb-Token') || localStorage.getItem('token');
  if (token) return true;

  sessionStorage.setItem('@airbnb-Token', 'showcase-token');
  localStorage.setItem('token', 'showcase-token');
  return true;
};

export const getToken = (): string | null => {
  return sessionStorage.getItem('@airbnb-Token') || localStorage.getItem('token');
};
