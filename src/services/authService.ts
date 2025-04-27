import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://seif23.pythonanywhere.com/api';

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData {
  email: string;
  password: string;
  username: string;
}

interface AuthResponse {
  access: string;
  refresh: string;
}

const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/jwt/create/`, credentials);
    if (response.data.access) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
  },

  async register(data: RegisterData): Promise<any> {
    return axios.post(`${API_URL}/auth/users/`, data);
  },

  async refreshToken(refresh: string): Promise<AuthResponse> {
    const response = await axios.post(`${API_URL}/auth/jwt/refresh/`, { refresh });
    if (response.data.access) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      user.access = response.data.access;
      localStorage.setItem('user', JSON.stringify(user));
    }
    return response.data;
  },

  async getCurrentUser() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.access) {
      const response = await axios.get(`${API_URL}/auth/users/me/`, {
        headers: { Authorization: `Bearer ${user.access}` }
      });
      return response.data;
    }
    return null;
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUserToken() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.access;
  }
};

export default authService; 