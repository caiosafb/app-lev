import React, { useContext, useState } from 'react';
import Input from '../../form/inputRegister';
import { faUser, faLock, faIdCard } from '@fortawesome/free-solid-svg-icons';
import styles from '../Auth/Register.module.css';
import { Context } from '../../../context/UserContext';

function Register() {
  const { register } = useContext(Context);
  const [formData, setFormData] = useState({
    username: '', // Assegure-se de usar 'username' aqui
    cpf: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      await register(formData);
      setFormData({
        username: '', // Assegure-se de usar 'username' aqui
        cpf: '',
        password: '',
        confirmPassword: ''
      });
      setError('');
      
      window.location.href = '/login';
    } catch (error) {
      console.error('Erro ao registrar:', error);
      setError('Erro ao registrar usuário. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.form_container}>
        <h1>Crie sua conta</h1>
        <form onSubmit={handleSubmit}>
          <Input
            icon={faUser}
            type="text"
            name="username" 
            placeholder="Nome de usuário"
            value={formData.username} 
            handleOnChange={handleChange}
          />
          <Input
            icon={faIdCard}
            type="text"
            name="cpf"
            placeholder="Seu CPF"
            value={formData.cpf}
            handleOnChange={handleChange}
          />
          <Input
            icon={faLock}
            type="password"
            name="password"
            placeholder="Sua senha"
            value={formData.password}
            handleOnChange={handleChange}
          />
          <Input
            icon={faLock}
            type="password"
            name="confirmPassword"
            placeholder="Confirme sua senha"
            value={formData.confirmPassword}
            handleOnChange={handleChange}
          />
          <input type="submit" value="Cadastrar" />
        </form>
        {error && <p className={styles.error}>{error}</p>}
      </section>
      <div className={styles.containersecundary}>
        <h1>O caminho <br />é a melhor <br />parte.</h1>
        <span>Junte-se a milhares de ebikers e <br />aproveite ainda mais o caminho.</span>
        <a href="/login">Voltar para login</a>
      </div>
    </div>
  );
}

export default Register;
