import { createContext, useContext, useState, ReactNode } from 'react';
import { AuthContextType, User } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Mock authentication - in a real app, this would validate against a backend
    try {
      if (!password) throw new Error('Password is required');
      // Extract name from email (temporary solution until we have proper backend)
      const name = email.split('@')[0];
      setUser({
        id: '1',
        email,
        name: name.charAt(0).toUpperCase() + name.slice(1), // Capitalize first letter
      });
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (name: string, email: string, password: string) => {
    // Mock registration - in a real app, this would create a user in the backend
    try {
      if (!password) throw new Error('Password is required');
      setUser({
        id: '1',
        email,
        name,
      });
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
}; 