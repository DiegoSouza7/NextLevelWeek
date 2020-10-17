import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as Yup from 'yup'
const jwt = require('jsonwebtoken')
const { hash, compare } = require('bcryptjs')

import Users from '../models/Users'

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

      const token = jwt.sign({
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
      password
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
  }
}