import React from 'react';
import styles from '../form/Input.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Input({ icon, type, label, name, placeholder, value, handleOnChange }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.input_container}>
        {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
        <input
          type={type}
          name={name} 
          id={name} 
          placeholder={placeholder}
          value={value}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
}

export default Input;
