import { login as authServiceLogin, logout as authServiceLogout } from './../services/AuthService';
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = async (email, password) => {
    const userData = await authServiceLogin(email, password);
    setCurrentUser(userData);
  };

  const logout = () => {
    authServiceLogout();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
