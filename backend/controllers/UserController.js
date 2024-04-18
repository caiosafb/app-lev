const User = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')

module.exports = class UserController {
    static async register(req, res) {
      const name = req.body.name
      const email = req.body.email
      const cpf = req.body.cpf
      const password = req.body.password
      const confirmpassword = req.body.confirmpassword
  
      // validations
      if (!name) {
        res.status(422).json({ message: 'O nome é obrigatório!' })
        return
      }
  
      if (!email) {
        res.status(422).json({ message: 'O e-mail é obrigatório!' })
        return
      }
  
      if (!cpf) {
        res.status(422).json({ message: 'O cpf é obrigatório!' })
        return
      }
  
      if (!password) {
        res.status(422).json({ message: 'A senha é obrigatória!' })
        return
      }
  
      if (!confirmpassword) {
        res.status(422).json({ message: 'A confirmação de senha é obrigatória!' })
        return
      }
  
      if (password != confirmpassword) {
        res
          .status(422)
          .json({ message: 'As senhas não conferem!' })
        return
      }
  
      // check if user exists
      const userExists = await User.findOne({ where: {email: email} })
  
      if (userExists) {
        res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
        return
      }
  
      // create password
      const salt = await bcrypt.genSalt(12)
      const passwordHash = await bcrypt.hash(password, salt)
  
      // create user
      try {
        const user = await User.create({
        name,
        email, 
        cpf,
        password: passwordHash})
        await createUserToken(user, req, res)
        } catch(error) {
            res.status(500).json({ message: error })
        }
    }

    static async login(req, res) {
        const { email, password} = req.body

        if(!email) {
            res.status(422).json({ message: 'O e-mail é obrigatório' })
            return
        }

        if(!password) {
            res.status(422).json({ message: 'A senha é obrigatória' })
            return
        }
      
        // check if user exists
      const user = await User.findOne({ where: {email: email} })
  
      if (!user) {
        res.status(422).json({ message: 'Esse usuário não existe!' })
        return
      }

      // checando se a senha é a mesma que a do banco!
      const checkPassword = await bcrypt.compare(password, user.password)

      if(!checkPassword) {
        res.status(422).json({
            message: "Senha inválida!",
        })
        return
      }
      await createUserToken(user, req, res)
    }

    static async checkUser(req, res) {
        let currentUser

        if(req.headers.authorization) {

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

        if(!user) {
          res.status(422).json({
            message: 'usuário não encontrado',
          })
          return
        }
        res.status(200).json({ user })
    }

    static async editUser(req, res) {
      const id = req.params.id

      //check if user exists
      const token = getToken(req)
      const user = await getUserByToken(token)

      const { name, email, cpf, password, confirmpassword} = req.body

      if(req.file) {
        user.image = req.file.filename
      }

      // validations 

      if (!name) {
        res.status(422).json({ message: 'O nome é obrigatório!' })
        return
      }

      user.name = name
  
      if (!email) {
        res.status(422).json({ message: 'O e-mail é obrigatório!' })
        return
      }

      const userExists = await User.findOne({where: {email: email}})

      if(user.email !== email && userExists) {
        res.status(422).json({ message: 'Por favor, utilize outro e-mail!' })
        return
      }

      user.email = email
  
      if (!cpf) {
        res.status(422).json({ message: 'O cpf é obrigatório!' })
        return
      }
      
      user.cpf = cpf
  
      if (password != confirmpassword) {
        res.status(422).json({ message: 'As senhas não conferem!' })
        return
      } else if(password === confirmpassword && password != null) {
        //creating password
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)

        user.password = passwordHash
      }

      try {
        //return user updated data
        await User.update({
          name: user.name,
          email: user.email,
          cpf: user.cpf,
          password: user.password
        }, {
          where: { id: id}
        }); 
        res.status(200).json({ message: "Usuário atualizado com sucesso!" })
      } catch(err) {
        res.status(500).json({ message: err})
        return
      }
    }
}
