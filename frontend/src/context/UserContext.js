import React, { createContext, useState } from 'react';
import useAuth from '../hooks/useAuth';

export const Context = createContext();

export const UserProvider = ({ children }) => {
  const { authenticated, register, login, logout, home } = useAuth();

  return (
    <Context.Provider value={{ authenticated, register, login, logout, home }}>
      {children}
    </Context.Provider>
  );
};
