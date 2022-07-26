import { SubjectController } from './controllers/SubjectController'
import { RoomController } from './controllers/RoomController'
import { Router } from 'express'

const routes = Router()

routes.post('/subject', new SubjectController().create)
routes.post('/room', new RoomController().create)
routes.post('/room/:idClass/create', new RoomController().createVideo)
routes.post('/room/:idClass/subject', new RoomController().createSubject)
routes.get('/room', new RoomController().list)

export default routes
