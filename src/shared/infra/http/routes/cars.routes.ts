import { Router } from 'express'
import multer from 'multer'

import uploadConfig from '../../../../config/upload'
import { CreateCarController } from '../../../../modules/cars/useCases/createCar/CreateCarController'
import { CreateCarSpecificationController } from '../../../../modules/cars/useCases/creteCarSpecification/CreateCarSpecificationController'
import { ListAvailableCarsController } from '../../../../modules/cars/useCases/listAvailableCars/ListAvailableCarsController'
import { UploadCarImageController } from '../../../../modules/cars/useCases/uploadCarImage/UploadCarImageController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const carsRoutes = Router()

const createCarController = new CreateCarController()
const listAvailableCarsController = new ListAvailableCarsController()
const createCarSpecificationController = new CreateCarSpecificationController()
const uploadCarsImagesController = new UploadCarImageController()

const upload = multer(uploadConfig.upload('./tmp/cars'))

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
)

carsRoutes.get('/available', listAvailableCarsController.handle)

carsRoutes.post(
  '/specifications/:id',
  ensureAuthenticated,
  ensureAdmin,
  createCarSpecificationController.handle,
)

carsRoutes.post(
  '/images/:id',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarsImagesController.handle,
)

export { carsRoutes }
