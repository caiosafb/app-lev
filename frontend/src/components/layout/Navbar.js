import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';


import styles from './Navbar.module.css';

import Logo from '../../assets/imgs/logo.png';

/* Context */
import { UserContext } from '../../context/UserContext';

function Navbar() {
    const { authenticated, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        localStorage.removeItem('token');
        navigate('/login'); 
      };

    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="" />
            </div>
            <ul>
                {authenticated ? (
                    <>
                        <li onClick={handleLogout}>Sair</li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Entrar</Link>
                        </li>
                        <li>
                            <Link to="/register">Cadastrar</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
