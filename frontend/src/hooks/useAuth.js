import api from '../utils/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useFlashMessage from '../hooks/useFlashMessage';

export default function useAuth() {
   const [authenticated, setAuthenticated] = useState(false);
   const { setFlashMessage } = useFlashMessage();
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem('token');

      if (token) {
        api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
        setAuthenticated(true);
      }
   }, []);

   async function register(user) {
     let msgText = 'Cadastro realizado com sucesso!';
     let msgType = 'success';

     try {
       const data = await api.post('/users/register', user).then((response) => response.data);
       await authUser(data);
     } catch (error) {
       msgText = error.response?.data?.message || 'Ocorreu um erro no cadastro';
       msgType = 'error';
     }

     setFlashMessage(msgText, msgType);
   }

   async function login(user) {
     let msgText = 'Login realizado com sucesso!';
     let msgType = 'success';

     try {
       const data = await api.post('/users/login', user).then((response) => response.data);
       if (data) {
         await authUser(data);
       } else {
         throw new Error('Dados de login inválidos');
       }
     } catch (error) {
       msgText = error.response?.data?.message || 'Ocorreu um erro no login';
       msgType = 'error';
     }

     setFlashMessage(msgText, msgType);
   }

   async function authUser(data) {
     setAuthenticated(true);
     localStorage.setItem('token', JSON.stringify(data.token));
     navigate('/');
   }

   return { authenticated, register, login };
}
