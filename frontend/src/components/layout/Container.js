// Container.js
import React from 'react';
import styles from './Container.module.css';

function Container({ children, backgroundImage }) {
    let containerClassName = styles.container; // Classe de estilo padrão

    // Condicionalmente adiciona a classe de estilo de fundo com base na prop backgroundImage
    if (backgroundImage === 'login') {
        containerClassName += ` ${styles.bgLogin}`;
    } else if (backgroundImage === 'register') {
        containerClassName += ` ${styles.bgRegister}`;
    } else if (backgroundImage === 'home') {
        containerClassName += ` ${styles.bgHome}`;
    }

    return <main className={containerClassName}>{children}</main>;
}

export default Container;
