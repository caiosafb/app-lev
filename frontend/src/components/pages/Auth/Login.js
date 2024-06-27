import React, { useState } from 'react';
import Input from '../../form/inputLogin';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import styles from '../Auth/Login.module.css';
import { login } from '../../../services/api';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      
      localStorage.setItem('userToken', data.token);
      window.location.href = '/home';
    } catch (error) {
      setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.form_container}>
        <form onSubmit={handleSubmit}>
          <Input
            icon={faUser}
            type="text"
            name="username"
            placeholder="Nome de usuário"
            value={username}
            handleOnChange={handleChange}
          />
          <Input
            icon={faLock}
            type="password"
            name="password"
            placeholder="Sua senha"
            value={password}
            handleOnChange={handleChange}
          />
          <div className={styles.rodape}>
            <p><a href="">Esqueci minha senha</a></p>
            <input type='submit' value='ENTRAR' />
            <span>Não tem uma conta?<a href="/register">Registre-se</a></span>
          </div>
          {error && <p className={styles.error}>{error}</p>}
        </form>
      </section>
    </div>
  );
}

export default Login;
