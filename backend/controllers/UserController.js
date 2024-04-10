const User = require('../models/User')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//helpers
const createUserToken = require('../helpers/create-user-token')
const getToken = require('../helpers/get-token')


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
          .json({ message: 'A senha e a confirmação precisam ser iguais!' })
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
            res.status(500).json({message: error})
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
}
