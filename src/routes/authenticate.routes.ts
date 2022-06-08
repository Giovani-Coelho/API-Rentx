import { Router } from 'express'

import { AuthenticateUserController } from '../modules/accounts/UserCases/authenticateUser/AuthenticateUserController'

const authentication = Router()

const authenticateUserController = new AuthenticateUserController()

authentication.post('/sessions', authenticateUserController.handle)

export { authentication }
