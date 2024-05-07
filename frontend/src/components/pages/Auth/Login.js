import Input from '../../form/inputLogin'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'; // Importe os ícones necessários


import styles from '../Auth/Login.module.css'

function Login() {
    function handleChange(e) { }
    return (
        <div className={styles.container}>
        <section className={styles.form_container}>
            <form>
                <Input
                    icon= {faEnvelope}
                    type="email"
                    name="email"
                    handleOnChange={handleChange}
                />
                <Input
                    icon={faLock}
                    type="password"
                    name="password"
                    handleOnChange={handleChange}
                />
                <div className={styles.rodape}>
                <p><a href="">Esqueci minha senha</a></p>
                <input type='submit' value='ENTRAR'/> 
                <span>Não tem uma conta?<a href="/register">Registre-se</a></span>
                </div>
            </form>
            </section>
        </div>        
    )
}

export default Login