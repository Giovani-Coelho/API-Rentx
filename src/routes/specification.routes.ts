import { Router } from 'express'
import { SpecificationsRepository } from '../modules/cars/repositories/SpecificationRepository'
import { CreateSpecificationService } from '../modules/cars/service/CreateSpecificationService'

const specificationRoutes = Router()

const specificationsRepository = new SpecificationsRepository()

specificationRoutes.post('/', (req, res) => {
  const { name, description } = req.body

  const createSpecificationsSerive = new CreateSpecificationService(
    specificationsRepository,
  )

  createSpecificationsSerive.execute({ name, description })

  return res.status(201).send()
})

export { specificationRoutes }
