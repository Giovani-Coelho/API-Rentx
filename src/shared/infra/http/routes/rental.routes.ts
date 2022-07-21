import { Router } from 'express'

import { CreateRentalController } from '../../../../modules/rentals/useCases/CreateRental/CreteRentalController'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const rentalsRoutes = Router()

const createRentalController = new CreateRentalController()

rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle)

export { rentalsRoutes }
