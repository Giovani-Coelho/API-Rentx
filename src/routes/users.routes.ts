import { Router } from 'express'

import { CreateUserController } from '../modules/accounts/UserCases/CreteUser/CreateUserController'

const usersRoutes = Router()

const createUserController = new CreateUserController()

usersRoutes.post('/', createUserController.handle)

export { usersRoutes }
