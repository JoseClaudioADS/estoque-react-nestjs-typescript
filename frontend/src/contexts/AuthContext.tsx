import React, { createContext, ReactNode } from 'react';
import useAuth from '../hooks/useAuth';

interface AuthContextProps {
  authenticated: boolean;
  handleLogin: any;
  handleLogout: any;
  loading: boolean;
}

const AuthContext = createContext({} as AuthContextProps);

export interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.SFC<AuthProviderProps> = ({ children }) => {
  const { authenticated, handleLogin, loading, handleLogout } = useAuth();

  return (
    <AuthContext.Provider
      value={{ authenticated, handleLogin, loading, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
