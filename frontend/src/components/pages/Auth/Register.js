import Input from '../../form/inputRegister'
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'; // Importe os ícones necessários


import styles from '../Auth/Register.module.css'

function Register() {
    function handleChange(e) { }
    return (
        <div className={styles.container}>
        <section className={styles.form_container}>
            <h1>Crie sua conta</h1>
            <form>
                <Input
                    icon={faUser}
                    type="text"
                    name="name"
                    placeholder="Seu nome"
                    handleOnChange={handleChange}
                />
                <Input
                    icon= {faEnvelope}
                    type="email"
                    name="email"
                    placeholder="Seu e-mail"
                    handleOnChange={handleChange}
                />
                <Input
                    icon={faLock}
                    type="password"
                    name="password"
                    placeholder="Sua senha"
                    handleOnChange={handleChange}
                />
                <Input
                    icon={faLock}
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme sua senha"
                    handleOnChange={handleChange}
                />
                <input type='submit' value='Cadastrar'/>
            </form>
            </section>
            <div className={styles.containersecundary}>
                <h1>O caminho <br />é a melhor <br />parte.</h1>
                <span>Junta-se a milhares de ebikers e <br />aproveite ainda mais o caminho.</span>
                <a href="/login">Voltar para login</a>
            </div>
        </div>        
    )
}

export default Register