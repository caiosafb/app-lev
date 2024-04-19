const User = require('../models/User')
const axios = require('axios'); // Importe o Axios para fazer requisições HTTP

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
  static async register(req, res) {
    const {
      name,
      email,
      cpf,
      phone,
      birthday,
      password,
      confirmPassword,
      cep,
      address,
      number,
      complement,
      neighborhood,
      city,
      cityCode
    } = req.body; // Destructuring dos campos do corpo da requisição

    // Definindo valores padrão para type, companyCode e cityCode
    const type = req.body.type || 'Cliente';
    const companyCode = req.body.companyCode || '1';


    // Validações
    if (!name || !email || !cpf || !phone || !birthday || !password || !confirmPassword) {
      return res.status(422).json({ message: 'Todos os campos obrigatórios devem ser preenchidos!' });
    }

    if (password !== confirmPassword) {
      return res.status(422).json({ message: 'As senhas não conferem!' });
    }

    // Validação do CPF
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    if (!cpf.match(cpfRegex)) {
      return res.status(422).json({ message: 'O CPF fornecido não é válido.' });
    }

    // Validação do telefone
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    if (!phone.match(phoneRegex)) {
      return res.status(422).json({ message: 'O número de telefone fornecido não é válido. O formato deve ser (99) 99999-9999.' });
    }

    // Validação da data de aniversário
    const birthdayRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!birthday.match(birthdayRegex)) {
      return res.status(422).json({ message: 'A data de aniversário deve estar no formato DD-MM-YYYY.' });
    }

    try {
      // Verifica se o usuário já existe
      const userExists = await User.findOne({ where: { email: email } });

      if (userExists) {
        return res.status(422).json({ message: 'Por favor, utilize outro e-mail!' });
      }

      // Consulta o endereço na API do ViaCEP
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

      if (response.status === 200) {
        const { logradouro, bairro, localidade, uf } = response.data;

        // Preenche os campos de endereço com os dados da resposta da API
        address = logradouro;
        neighborhood = bairro;
        city = localidade;
        cityCode = uf;

        // Verifica se o complemento foi fornecido na requisição
        if (req.body.complement) {
          complement = req.body.complement;
        } else {
          complement = complemento;
        }
      } else {
        console.error('Erro ao consultar o ViaCEP:', response.statusText);
      }

      // Cria o hash da senha
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      // Cria o usuário
      const user = await User.create({
        name,
        email,
        cpf,
        phone,
        birthday,
        password: passwordHash,
        type,
        companyCode,
        cep,
        address,
        number,
        complement,
        neighborhood,
        city,
        cityCode
      });

      // Chama a função para criar o token do usuário
      await createUserToken(user, req, res);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao registrar usuário.' });

    }

  }

  static async login(req, res) {
    const { email, password } = req.body

    try {

      if (!email) {
        res.status(422).json({ message: 'O e-mail é obrigatório' })
        return
      }

      if (!password) {
        res.status(422).json({ message: 'A senha é obrigatória' })
        return
      }

      // check if user exists
      const user = await User.findOne({ where: { email: email } })

      if (!user) {
        res.status(422).json({ message: 'Esse usuário não existe!' })
        return
      }

      // checando se a senha é a mesma que a do banco!
      const checkPassword = await bcrypt.compare(password, user.password)

      if (!checkPassword) {
        res.status(422).json({
          message: "Senha inválida!",
        })
        return
      }
      await createUserToken(user, req, res)
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao processar o login.' })
    }
  }

  static async checkUser(req, res) {
    let currentUser

    if (req.headers.authorization) {

      const token = getToken(req)
      const decoded = jwt.verify(token, 'KErD70A48Ss126jtRPzi')

      currentUser = await User.findByPk(decoded.id)

      currentUser.password = undefined

    } else {
      currentUser = null
    }
    res.status(200).send(currentUser)
  }

  static async getUserById(req, res) {

    const id = req.params.id

    const user = await User.findByPk(id)

    if (!user) {
      res.status(422).json({
        message: 'usuário não encontrado',
      })
      return
    }
    res.status(200).json({ user })
  }

  static async editUser(req, res) {
    try {
      // Obtém o token da requisição
      const token = getToken(req);

      // Obtém o usuário correspondente ao token
      const userId = await getUserByToken(token);

      // Verifica se o usuário existe
      if (!userId) {
        return res.status(404).json({ message: 'Usuário não encontrado.' });
      }

      // Obtém o usuário do banco de dados usando o ID do usuário obtido do token
      const user = await User.findByPk(userId);

      // Verifica se o usuário que está tentando editar é o próprio usuário autenticado
      if (userId !== parseInt(req.params.id)) {
        return res.status(403).json({ message: 'Você não tem permissão para editar este usuário.' });
      }

      // Destructuring dos campos do corpo da requisição
      const {
        name,
        email,
        cpf,
        phone,
        birthday,
        password,
        confirmPassword,
        cep,
        address,
        number,
        complement,
        neighborhood,
        city
      } = req.body;

      // Validações
      if (!name || !email || !cpf || !phone || !birthday || !password || !confirmPassword) {
        return res.status(422).json({ message: 'Todos os campos obrigatórios devem ser preenchidos!' });
      }

      if (password !== confirmPassword) {
        return res.status(422).json({ message: 'As senhas não conferem!' });
      } else if (password && password !== confirmPassword) {
        // Cria o hash da nova senha
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);
        // Atualiza a senha do usuário
        user.password = passwordHash;
      }

      if (req.file) {
        user.image = req.file.filename
      }

      // Atualiza os campos do usuário com os dados fornecidos na requisição
      user.name = name;
      user.email = email;
      user.cpf = cpf;
      user.phone = phone;
      user.birthday = birthday;
      user.cep = cep;
      user.address = address;
      user.number = number;
      user.complement = complement;
      user.neighborhood = neighborhood;
      user.city = city;

      // Atualiza o usuário no banco de dados
      await user.save();

      res.status(200).json({ message: "Usuário atualizado com sucesso!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao atualizar usuário.' });
    }
  }
}
