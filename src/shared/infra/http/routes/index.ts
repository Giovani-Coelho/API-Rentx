import { Router } from 'express'

import { authentication } from './authenticate.routes'
import { carsRoutes } from './cars.routes'
import { categoriesRoutes } from './categories.routes'
import { passwordRoutes } from './password.routes'
import { rentalsRoutes } from './rental.routes'
import { specificationRoutes } from './specification.routes'
import { usersRoutes } from './users.routes'

const router = Router()

router.use('/categories', categoriesRoutes)
router.use('/specifications', specificationRoutes)
router.use('/users', usersRoutes)
router.use('/cars', carsRoutes)
router.use('/rentals', rentalsRoutes)
router.use('/password', passwordRoutes)
router.use(authentication)

export { router }
