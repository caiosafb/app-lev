const User = require('../models/User');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/create-user-token');

module.exports = class UserController {
    static async register(req, res) {
        const { name, email, password, confirmpassword } = req.body;

        // validations
        if (!name || !email || !password || !confirmpassword) {
            res.status(422).json({ message: 'Todos os campos são obrigatórios' });
            return;
        }
        if (password !== confirmpassword) {
            res.status(422).json({ message: 'A senha e a confirmação de senha precisam ser iguais!' });
            return;
        }

        try {
            // Verifica se o usuário já existe
            const userExists = await User.findOne({ where: { email: email } });
            if (userExists) {
                res.status(422).json({ message: 'Por favor, utilize outro e-mail' });
                return;
            }

            // Cria o hash da senha
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            // Cria um novo usuário no banco de dados
            const newUser = await User.create({
                name,
                email,
                password: passwordHash
            });

            // Cria e envia o token de autenticação
            await createUserToken(newUser, req, res);

            // Retorna a resposta de sucesso
            res.status(201).json({ message: 'Usuário criado com sucesso', user: newUser });
        } catch (error) {
            // Retorna um erro em caso de falha
            res.status(500).json({ message: error.message });
            
        }
    }

    static async login(req, res) {

        const {email, password} = req.body 

         // validations
         if (!email || !password) {
            res.status(422).json({ message: 'Todos os campos são obrigatórios' });
            return;
        }
        // Verifica se o usuário já existe
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            res.status(422).json({ message: 'Não há usuário cadastrado com esse e-mail' });
            return;
        }

        const checkPassword = await bcrypt.compare(password, user.password)

        if(!checkPassword) {
            res.status(422).json({
                message: 'Senha inválida!',
            })
            return
        }
        await createUserToken(user, req, res)
    }
}
