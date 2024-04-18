import Input from '../../form/input'

function Register() {
    function handleChange(e) { }
    return (
        <section>
            <h1>Registrar</h1>
            <form>
                <Input
                    text='Nome'
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    handleOnChang={handleChange}
                />
                <Input
                    text='E-mail'
                    type="email"
                    name="email"
                    placeholder="Digite seu e-mail"
                    handleOnChang={handleChange}
                />
                <Input
                    text='Nome'
                    type="text"
                    name="name"
                    placeholder="Digite seu nome"
                    handleOnChang={handleChange}
                />

            </form>
        </section>
    )
}

export default Register