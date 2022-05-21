import { Router } from 'express'

import { createSpecificationController } from '../modules/cars/useCases/createSpecification'

const specificationRoutes = Router()

specificationRoutes.post('/', (req, res) =>
  createSpecificationController.handle(req, res),
)

export { specificationRoutes }
