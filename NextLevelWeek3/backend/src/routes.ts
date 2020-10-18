import { Router } from 'express'
import multer from 'multer'

import Users from './controllers/Users'
import OrphanagesController from './controllers/OrphanagesController'
import uploadConfig from './config/upload'
import jwt from './middlewares/jwt'
import Auth from './controllers/Auth'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/Auth', Auth)

routes.post('/login', Users.login)
routes.post('/orphanages', jwt, upload.array('images'), OrphanagesController.create)
routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)

routes.get('/users', jwt, Users.show)
routes.post('/users', Users.create)

// login

routes.post('/forgot', Users.forgot)
routes.post('/reset', Users.reset)

export default routes