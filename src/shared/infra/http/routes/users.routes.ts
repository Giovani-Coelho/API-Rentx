import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../../../../config/upload'
import { CreateUserController } from '../../../../modules/accounts/UserCases/CreteUser/CreateUserController'
import { UpdateUserAvaterController } from '../../../../modules/accounts/UserCases/updateUserAvater/UpdateUserAvatarController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const usersRoutes = Router()

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'))

const createUserController = new CreateUserController()
const updateUserAvaterController = new UpdateUserAvaterController()

usersRoutes.post('/', createUserController.handle)

usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  uploadAvatar.single('avatar'),
  updateUserAvaterController.handle,
)

export { usersRoutes }
