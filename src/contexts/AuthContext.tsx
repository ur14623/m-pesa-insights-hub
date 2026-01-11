import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (userId: string) => boolean;
  logout: () => void;
  register: (userId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('playwright-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userId: string): boolean => {
    const users = JSON.parse(localStorage.getItem('playwright-users') || '[]');
    const existingUser = users.find((u: User) => u.id === userId);
    
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem('playwright-user', JSON.stringify(existingUser));
      return true;
    }
    return false;
  };

  const register = (userId: string): boolean => {
    const users = JSON.parse(localStorage.getItem('playwright-users') || '[]');
    const exists = users.some((u: User) => u.id === userId);
    
    if (exists) return false;
    
    const newUser: User = {
      id: userId,
      createdAt: new Date().toISOString(),
    };
    
    users.push(newUser);
    localStorage.setItem('playwright-users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('playwright-user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('playwright-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
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
