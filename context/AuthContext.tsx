import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        AsyncStorage.getItem('token'),
        AsyncStorage.getItem('user')
      ]);
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Error checking auth:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    // TODO: Implementar llamada a API real
    const mockUser = { id: '1', email, name: 'Usuario de Prueba' };
    const mockToken = 'mock-token';

    await Promise.all([
      AsyncStorage.setItem('token', mockToken),
      AsyncStorage.setItem('user', JSON.stringify(mockUser))
    ]);
    
    setToken(mockToken);
    setUser(mockUser);
  };

  const register = async (email: string, password: string, name: string) => {
    // TODO: Implementar llamada a API real
    const mockUser = { id: '1', email, name };
    const mockToken = 'mock-token';

    await Promise.all([
      AsyncStorage.setItem('token', mockToken),
      AsyncStorage.setItem('user', JSON.stringify(mockUser))
    ]);
    
    setToken(mockToken);
    setUser(mockUser);
  };

  const logout = async () => {
    await Promise.all([
      AsyncStorage.removeItem('token'),
      AsyncStorage.removeItem('user')
    ]);
    setToken(null);
    setUser(null);
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
