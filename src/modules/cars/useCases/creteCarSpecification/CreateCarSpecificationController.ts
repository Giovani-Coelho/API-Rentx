import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCarsSpecificationUseCase } from './CreateCarSpecificationUseCase'

class CreateCarSpecificationController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params
    const { specifications_id } = req.body
    const creteCarSpecificationUseCase = container.resolve(
      CreateCarsSpecificationUseCase,
    )

    console.log(id)

    const cars = await creteCarSpecificationUseCase.execute({
      car_id: id,
      specifications_id,
    })

    return res.json(cars)
  }
}

export { CreateCarSpecificationController }
