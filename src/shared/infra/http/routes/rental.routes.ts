import { Router } from 'express'

import { CreateRentalController } from '../../../../modules/rentals/useCases/CreateRental/CreteRentalController'
import { DevolutionRentalController } from '../../../../modules/rentals/useCases/devolutionRental/DevolutionRentalController'
import { ListRentalByUserController } from '../../../../modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()
const devolutionRentalController = new DevolutionRentalController()
const listRentalByUserController = new ListRentalByUserController()

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle)

rentalsRoutes.post(
  '/devolution/:id',
  ensureAuthenticated,
  devolutionRentalController.handle,
)

rentalsRoutes.get(
  '/user',
  ensureAuthenticated,
  listRentalByUserController.handle,
)

export { rentalsRoutes }
