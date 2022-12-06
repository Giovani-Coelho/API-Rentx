import { Router } from 'express'

import { ResetPasswordUserController } from '../../../../modules/accounts/UserCases/resetPasswordUser/ResetPasswordUserController'
import { SendForgotPasswordMailController } from '../../../../modules/accounts/UserCases/SendForgotPasswordMail/SendForgotPasswordMailController'

const passwordRoutes = Router()

const sendForgotPasswordMailController = new SendForgotPasswordMailController()
const resetPasswordController = new ResetPasswordUserController()

passwordRoutes.post('/forgot', sendForgotPasswordMailController.handle)
passwordRoutes.post('/reset', resetPasswordController.handle)

export { passwordRoutes }
