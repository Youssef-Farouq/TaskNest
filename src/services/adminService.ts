import axios from 'axios';
import authService from './authService';

const API_URL = import.meta.env.VITE_API_URL || 'https://seif23.pythonanywhere.com/api';

interface User {
  id: number;
  username: string;
  email: string;
  is_active: boolean;
  is_admin: boolean;
  task_count: number;
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  created_at: string;
}

const adminService = {
  async getAllUsers(): Promise<User[]> {
    const token = authService.getCurrentUserToken();
    const response = await axios.get(`${API_URL}/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async toggleUserActivation(userId: number): Promise<User> {
    const token = authService.getCurrentUserToken();
    const response = await axios.patch(`${API_URL}/users/${userId}/toggle-/activate`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async toggleUserAdmin(userId: number): Promise<User> {
    const token = authService.getCurrentUserToken();
    const response = await axios.patch(`${API_URL}/users/${userId}/toggle-/admin`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async deleteUser(userId: number): Promise<void> {
    const token = authService.getCurrentUserToken();
    await axios.delete(`${API_URL}/users/${userId}/delete/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
  },

  async editUserUsername(userId: number, newUsername: string): Promise<User> {
    const token = authService.getCurrentUserToken();
    const response = await axios.patch(`${API_URL}/users/${userId}/edit/`, 
      { username: newUsername },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  },

  async getUserTasks(userId: number): Promise<Task[]> {
    const token = authService.getCurrentUserToken();
    const response = await axios.get(`${API_URL}/users/${userId}/tasks/`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default adminService; 