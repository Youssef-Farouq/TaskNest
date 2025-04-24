import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthContextType, User, UserRole } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

// Predefined users for demo purposes
const PREDEFINED_USERS = {
  admin: {
    id: '1',
    email: 'admin@tasknest.com',
    name: 'Admin User',
    role: 'admin' as UserRole,
    createdAt: new Date('2024-01-01').toISOString(),
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff',
  },
  user: {
    id: '2',
    email: 'user@tasknest.com',
    name: 'Regular User',
    role: 'user' as UserRole,
    createdAt: new Date('2024-01-02').toISOString(),
    avatar: 'https://ui-avatars.com/api/?name=Regular+User&background=0D8ABC&color=fff',
  }
};

// Initialize localStorage with predefined users if it's empty
const initializeUsers = () => {
  const existingUsers = localStorage.getItem('users');
  if (!existingUsers) {
    const initialUsers = [PREDEFINED_USERS.admin, PREDEFINED_USERS.user];
    localStorage.setItem('users', JSON.stringify(initialUsers));
  }
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Initialize users in localStorage when the app starts
  useEffect(() => {
    initializeUsers();
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const addUserToStorage = (newUser: User) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const existingUserIndex = users.findIndex((u: User) => u.id === newUser.id);
    
    if (existingUserIndex >= 0) {
      users[existingUserIndex] = newUser;
    } else {
      users.push(newUser);
    }
    
    localStorage.setItem('users', JSON.stringify(users));
  };

  const login = async (email: string, password: string) => {
    try {
      if (!password) throw new Error('Password is required');
      
      // Check for predefined users
      if (email === PREDEFINED_USERS.admin.email && password === 'admin123') {
        setUser(PREDEFINED_USERS.admin);
        addUserToStorage(PREDEFINED_USERS.admin);
        return;
      } else if (email === PREDEFINED_USERS.user.email && password === 'user123') {
        setUser(PREDEFINED_USERS.user);
        addUserToStorage(PREDEFINED_USERS.user);
        return;
      }

      // For demo purposes, create a new regular user
      const name = email.split('@')[0];
      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        role: 'user',
        createdAt: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`,
      };
      setUser(newUser);
      addUserToStorage(newUser);
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      if (!password) throw new Error('Password is required');
      
      // Prevent registration with predefined emails
      if (email === PREDEFINED_USERS.admin.email || email === PREDEFINED_USERS.user.email) {
        throw new Error('This email is not available');
      }

      const newUser: User = {
        id: crypto.randomUUID(),
        email,
        name,
        role: 'user',
        createdAt: new Date().toISOString(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D8ABC&color=fff`,
      };
      setUser(newUser);
      addUserToStorage(newUser);
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}; 