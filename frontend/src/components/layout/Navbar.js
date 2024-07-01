import {Link} from "react-router-dom"
import { useContext } from "react"

import styles from './Navbar.module.css'

import Logo from '../../assets/imgs/logo.png'

/* Context */
import { Context } from '../../context/UserContext'

function Navbar() {
    const { authenticated } = useContext(Context)
    return (
        <nav className={styles.navbar}>
            <div className={styles.navbar_logo}>
                <img src={Logo} alt="" />
            </div>
        <ul>
            {authenticated ? (
                <>
                <p>logado</p>
                </>
            ): (
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
    )
}


export default Navbar