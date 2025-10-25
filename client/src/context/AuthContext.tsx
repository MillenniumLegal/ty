import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthUser, LoginCredentials } from '@/types';

interface AuthContextType {
  user: AuthUser | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token on app load
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Mock authentication - works without backend
      const mockUsers = [
        {
          id: '1',
          name: 'Admin User',
          email: 'admin@millenniumlegal.co.uk',
          role: 'Admin' as const,
          token: 'mock-token-admin',
          avatar: null,
          lastLogin: new Date().toISOString(),
        },
        {
          id: '2',
          name: 'Manager User',
          email: 'manager@millenniumlegal.co.uk',
          role: 'Manager' as const,
          token: 'mock-token-manager',
          avatar: null,
          lastLogin: new Date().toISOString(),
        },
        {
          id: '3',
          name: 'Agent User',
          email: 'agent@millenniumlegal.co.uk',
          role: 'Agent' as const,
          token: 'mock-token-agent',
          avatar: null,
          lastLogin: new Date().toISOString(),
        }
      ];

      // Find user by email
      const user = mockUsers.find(u => u.email === credentials.email);
      
      if (user && credentials.password === 'password123') {
        setUser(user);
        localStorage.setItem('authToken', user.token);
        localStorage.setItem('userData', JSON.stringify(user));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};



