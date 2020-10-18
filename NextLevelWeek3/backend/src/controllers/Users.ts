import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import Users from '../models/Users'
import mailer  from '../config/mailer'
import * as Yup from 'yup'
const { hash, compare } = require('bcryptjs')
import crypto from 'crypto'

const jwt = require('jsonwebtoken')


export default {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const usersRepository = getRepository(Users)
      
      const user = await usersRepository.findOne({ email })

      if (!user) {
        return res.status(401).json({ error: 'Error' })
      }
      
      const passed = await compare(password, user.password)

      if (passed === false) return res.status(401).json('Senha incorreta')

      const token = await jwt.sign({
        id: user.id
      }, process.env.JWT_KEY, {
        expiresIn: 60 * 60
      })

      return res.json(token)
    } catch (error) {
      return res.status(400).json('Error')
    }
  },
  async create(req: Request, res: Response) {
    let { name, email, password } = req.body

    password = await hash(password, 8)

    const usersRepository = getRepository(Users)

    const data = {
      name,
      email,
      password,
      reset_token: '',
      reset_token_expires: ''
    }

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
      password: Yup.string().required()
    })

    
    await schema.validate(data, {
      abortEarly: false
    })
    
    const user = usersRepository.create(data)

    await usersRepository.save(user)

    return res.status(201).json(user)
  },
  async show(req: Request, res: Response) {
    const { id } = res.locals.jwtPayload
    const usersRepository = getRepository(Users)

    const result = await usersRepository.findOne(id)

    const user = {
      id: result?.id,
      name: result?.name,
      email: result?.email,
    }

    return res.json(user)
  },
  async forgot(req: Request, res: Response) {
    try {
      const { email } = req.body

      const usersRepository = getRepository(Users)

      const user = await usersRepository.findOne({ email })

      if (!user) {
        return res.status(401).json({ error: 'Error' })
      }

      const reset_token = String(crypto.randomBytes(20).toString('hex'))
    
      const now = new Date()
      const nows = now.setHours(now.getHours() + 1)
      const  reset_token_expires = String(nows)

      const data = {
        reset_token,
        reset_token_expires
      }

      await usersRepository.update(user.id, data )

      await mailer.sendMail({
          to: user.email,
          from: 'no-reply@newProjet.com',
          subject: 'Recuperação de senha',
          html: `<h2>Perdeu a senha?</h2>
          <p>Clique no link para recuperar sua senha</p>
          <p>
              <a href="http://localhost:3000/reset?token=${reset_token}" target="_blanck">
              CRIAR SENHA
              </a>
          </p>
          `
      })

      return res.status(200).json("Verifique seu email para resetar sua senha!")
    } catch (error) {
      return res.status(401).send()
    }
  },
  async reset(req: Request, res: Response) {
    try{ 
      let { password, location } = req.body
      let reset_token = location.replace('token=', '')

      const usersRepository = getRepository(Users)

      const user = await usersRepository.findOne({ reset_token })

      if(!user) return res.status(401).json('token não encontrado')

      let now: any = new Date()

      now = now.setHours(now.getHours())

      if(now > user.reset_token_expires) return res.status(401).send()

      password = await hash(password, 8)

      const data = {
        password,
        reset_token: '',
        reset_token_expires: ''
      }

      await usersRepository.update(user.id, data)
      return res.status(200).send()
    } catch (error) {

    }
  }
}