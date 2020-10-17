import { Router } from 'express'
import multer from 'multer'

import Users from './controllers/Users'
import OrphanagesController from './controllers/OrphanagesController'
import uploadConfig from './config/upload'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/orphanages', OrphanagesController.index)
routes.get('/orphanages/:id', OrphanagesController.show)
routes.post('/orphanages', upload.array('images'), OrphanagesController.create)
routes.post('/users', Users.create)

// login

routes.post('/login', Users.login)

export default routes