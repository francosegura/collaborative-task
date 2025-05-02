import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const [storedToken, storedUser] = await Promise.all([
        SecureStore.getItemAsync(TOKEN_KEY),
        SecureStore.getItemAsync(USER_KEY)
      ]);
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        router.replace('/tasks');
      } else {
        router.replace('/login');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      router.replace('/login');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      // TODO: Implementar llamada a API real
      const mockUser = { id: '1', email, name: 'Usuario de Prueba' };
      const mockToken = 'mock-token';

      await Promise.all([
        SecureStore.setItemAsync(TOKEN_KEY, mockToken),
        SecureStore.setItemAsync(USER_KEY, JSON.stringify(mockUser))
      ]);
      
      setToken(mockToken);
      setUser(mockUser);
      router.replace('/tasks');
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      // TODO: Implementar llamada a API real
      const mockUser = { id: '1', email, name };
      const mockToken = 'mock-token';

      await Promise.all([
        SecureStore.setItemAsync(TOKEN_KEY, mockToken),
        SecureStore.setItemAsync(USER_KEY, JSON.stringify(mockUser))
      ]);
      
      setToken(mockToken);
      setUser(mockUser);
      router.replace('/tasks');
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await Promise.all([
        SecureStore.deleteItemAsync(TOKEN_KEY),
        SecureStore.deleteItemAsync(USER_KEY)
      ]);
      setToken(null);
      setUser(null);
      router.replace('/login');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
