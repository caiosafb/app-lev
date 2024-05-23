import api from '../utils/api'
import { useState } from 'react'; 
import bus from "../utils/bus";
import useFlashMessage from '../hooks/useFlashMessage'

import styles from "../components/layout/Message.module.css";

export default function useAuth() {

   const { setFlashMessage } = useFlashMessage();
  
  async function register(user) {
    let msgText = 'Cadastro realizado com sucesso!'
    let msgType = 'success'

    try {
      const data = await api.post('/users/register', user); 
    } catch (error) {
      // tratar erro
      msgText = error.response.data.message
      msgType = 'error'
    }

    setFlashMessage(msgText, msgType)
  }

  return {register}

}
