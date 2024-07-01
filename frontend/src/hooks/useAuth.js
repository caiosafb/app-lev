import api from '../utils/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFlashMessage from '../hooks/useFlashMessage';

export default function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const { setFlashMessage } = useFlashMessage();
  const history = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }
  }, []);

  async function register(user) {
    try {
      const response = await api.post('/users/register', user);
      const data = response.data;

      await authUser(data);
      setFlashMessage('Cadastro realizado com sucesso!', 'success');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Ocorreu um erro no cadastro';
      setFlashMessage(errorMessage, 'error');
    }
  }

  async function login(user) {
    try {
      const response = await api.post('/users/login', user);
      const data = response.data;

      await authUser(data);
      setFlashMessage('Login realizado com sucesso!', 'success');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Ocorreu um erro no login';
      setFlashMessage(errorMessage, 'error');
    }
  }

  async function authUser(data) {
    setAuthenticated(true);
    localStorage.setItem('token', JSON.stringify(data.token));
    history('/');
  }

  return { authenticated, register, login };
}
