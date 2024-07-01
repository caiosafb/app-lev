import React, { useState, useContext } from 'react';
import Input from '../../form/inputLogin';
import { Link } from 'react-router-dom';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';

import { Context } from '../../../context/UserContext';

import styles from '../Auth/Login.module.css';

function Login() {
  const [user, setUser] = useState({
    username: '',
    password: ''
  });
  const { login } = useContext(Context);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user);
  }

  return (
    <div className={styles.container}>
      <section className={styles.form_container}>
        <form onSubmit={handleSubmit}>
          <Input
            icon={faUser}
            type="text"
            name="username"
            placeholder="Nome de usuário"
            handleOnChange={handleChange}
            value={user.username}
          />
          <Input
            icon={faLock}
            type="password"
            name="password"
            placeholder="Sua senha"
            handleOnChange={handleChange}
            value={user.password}
          />
          <div className={styles.rodape}>
            <input type="submit" value="ENTRAR" />
            <span>Não tem conta? <Link to="/register">Clique aqui.</Link></span>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Login;
