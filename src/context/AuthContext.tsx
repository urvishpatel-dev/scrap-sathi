import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { api } from '../api/client';

interface AuthContextType {
  user: User | null;
  token: string | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (payload: { email: string; password: string; role: UserRole; name?: string; organizationName?: string; city?: string }) => Promise<any>;
  verifyOtp: (email: string, otp: string) => Promise<boolean>;
  logout: () => void;
  loginAsDemo: (role: UserRole) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('scrapsaathi_token'));
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize session from token
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('scrapsaathi_token');
      if (storedToken) {
        try {
          const currentUser = await api.getCurrentUser();
          setUser(currentUser);
          setToken(storedToken);
        } catch (err) {
          console.warn('Session expired or invalid token');
          localStorage.removeItem('scrapsaathi_token');
          setUser(null);
          setToken(null);
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const res = await api.login(email, password);
      setUser(res.user);
      setToken(res.token);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (payload: { email: string; password: string; role: UserRole; name?: string; organizationName?: string; city?: string }) => {
    setIsLoading(true);
    try {
      const res = await api.register(payload);
      setUser(res.user);
      setToken(res.token);
      return res;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyOtp = async (email: string, otp: string): Promise<boolean> => {
    const res = await api.verifyOtp(email, otp);
    if (res.isVerified && user) {
      setUser({ ...user, isEmailVerified: true, isPhoneVerified: true });
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('scrapsaathi_token');
    setUser(null);
    setToken(null);
  };

  const loginAsDemo = async (targetRole: UserRole) => {
    setIsLoading(true);
    try {
      if (targetRole === 'COLLECTOR') {
        await login('collector@demo.scrapsaathi.local', 'Saathi@2026');
      } else if (targetRole === 'RECYCLER') {
        await login('recycler@demo.scrapsaathi.local', 'Recycle@2026');
      } else {
        await login('admin@demo.scrapsaathi.local', 'Admin@2026');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        role: user?.role || null,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        verifyOtp,
        logout,
        loginAsDemo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
