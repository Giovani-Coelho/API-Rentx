import { Router } from 'express'

import { AuthenticateUserController } from '../../../../modules/accounts/UserCases/authenticateUser/AuthenticateUserController'
import { RefreshTokenController } from '../../../../modules/accounts/UserCases/refreshToken/RefreshTokenController'

const authentication = Router()

const authenticateUserController = new AuthenticateUserController()
const refreshTokenController = new RefreshTokenController()

authentication.post('/sessions', authenticateUserController.handle)
authentication.post('/refresh-token', refreshTokenController.handle)

export { authentication }
