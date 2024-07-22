import React, { createContext } from 'react';
import useAuth from '../hooks/useAuth';

// Renomeia o contexto para UserContext
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { authenticated, register, login, logout } = useAuth();

  return (
    <UserContext.Provider value={{ authenticated, register, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
