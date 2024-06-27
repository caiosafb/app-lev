import React, { createContext, useState } from 'react';
import { login } from '../services/api'; // Importe o método específico que você precisa

const Context = createContext();

export function UserProvider({ children }) { // Certifique-se de exportar corretamente aqui
  const [user, setUser] = useState(null);

  const register = async (formData) => {
    try {
      const response = await login(formData); // Chame a função de login do seu serviço
      if (response.data) {
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      // Tratar erro de registro
    }
  };

  return (
    <Context.Provider value={{ user, register }}>
      {children}
    </Context.Provider>
  );
}

export { Context }; 
