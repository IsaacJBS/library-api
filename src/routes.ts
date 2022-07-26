import { SubjectController } from './controllers/SubjectController'
import { RoomController } from './controllers/RoomController'
import { Router } from 'express'

const routes = Router()

routes.post('/subject', new SubjectController().create)
routes.post('/room', new RoomController().create)

export default routes
