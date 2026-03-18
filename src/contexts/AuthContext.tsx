import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

export type UserRole = 'admin' | 'user';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo - will be replaced with Supabase
const MOCK_USERS: Record<string, { password: string; user: AuthUser }> = {
  'admin@ghsbabikhel.edu.pk': {
    password: 'admin123',
    user: { id: '1', email: 'admin@ghsbabikhel.edu.pk', name: 'Admin', role: 'admin' },
  },
  'user@ghsbabikhel.edu.pk': {
    password: 'user123',
    user: { id: '2', email: 'user@ghsbabikhel.edu.pk', name: 'Student User', role: 'user' },
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('ghs_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [isLoading] = useState(false);

  const signIn = useCallback(async (email: string, password: string) => {
    const mockUser = MOCK_USERS[email];
    if (mockUser && mockUser.password === password) {
      setUser(mockUser.user);
      localStorage.setItem('ghs_user', JSON.stringify(mockUser.user));
    } else {
      throw new Error('Invalid email or password');
    }
  }, []);

  const signUp = useCallback(async (email: string, _password: string, name: string) => {
    const newUser: AuthUser = { id: Date.now().toString(), email, name, role: 'user' };
    setUser(newUser);
    localStorage.setItem('ghs_user', JSON.stringify(newUser));
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ghs_user');
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
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
