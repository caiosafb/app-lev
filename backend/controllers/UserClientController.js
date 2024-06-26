const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sankhyaService = require('../services/sankhyaService');

// helpers
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

module.exports = class UserClientController {
  static async register(req, res) {
    const {
      username,
      cpf,
      password,
      confirmPassword,
    } = req.body;

    console.log('Received registration data:', req.body);

    // Validação do nome de usuário
    const usernameRegex = /^[a-zA-Z0-9_]{2,100}$/;

    if (typeof username !== 'string' || !username.match(usernameRegex)) {
      return res.status(400).json({ message: 'Username inválido' });
    }
    if (username.length < 2 || username.length > 100) {
      return res.status(422).json({ message: 'O nome de usuário deve ter entre 2 e 100 caracteres.' });
    }

    // Validação do CPF
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpf.match(cpfRegex)) {
      return res.status(422).json({ message: 'O CPF fornecido não é válido.' });
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!password.match(passwordRegex)) {
      return res.status(422).json({ message: 'A senha fornecida não é válida. Deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial.' });
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ message: 'As senhas não conferem!' });
    }

    const userExists = await User.findOne({ username: username });

    if (userExists) {
      return res.status(422).json({ message: 'Por favor, utilize outro nome de usuário!' });
    }

    // Cria o hash da senha
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    console.log('Saving new user:', { username, cpf, passwordHash });

    // Cria o usuário
    const user = new User({
      username,
      cpf,
      password: passwordHash,
    });

    try {
      const newUser = await user.save()
      await createUserToken(newUser, req, res)
    } catch (error) {
      res.status(500).json({ message: error })
    }

  }

  static async login(req, res) {
    const { username, password } = req.body;

    try {
      if (!username) {
        return res.status(422).json({ message: 'O nome de usuário é obrigatório' });

      }

      if (!password) {
        return res.status(422).json({ message: 'A senha é obrigatória' });

      }

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(422).json({ message: 'Esse usuário não existe!' });

      }

      const checkPassword = await bcrypt.compare(password, user.password);

      if (!checkPassword) {
        return res.status(422).json({ message: "Senha inválida!" });

      }

      await createUserToken(user, req, res);

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro ao processar o login.' });
      return
    }
  }

  static async checkUser(req, res) {

    let currentUser

    if (req.headers.authorization) {

      const token = getToken(req)
      const decoded = jwt.verify(token, 'secret')

      currentUser = await User.findById(decoded.id)

      currentUser.password = undefined

    } else {
      currentUser = null
    }

    res.status(200).send(currentUser)
  }

  static async getUserById(req, res) {

    const id = req.params.id

    const user = await User.findById(id).select('-password')

    if (!user) {
      res.status(422).json({
        message: 'Usuário não encontrado'
      })
      return
    }

    res.status(200).json({ user })
  }
}