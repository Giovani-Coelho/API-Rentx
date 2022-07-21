import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateRentalUseCase } from './CreateRentalUseCase'

class CreateRentalController {
  public async handle(req: Request, res: Response) {
    const { expect_return_date, car_id } = req.body
    const { id } = req.user
    const createRentalUseCase = container.resolve(CreateRentalUseCase)

    const rental = await createRentalUseCase.execute({
      car_id,
      expect_return_date,
      user_id: id,
    })

    return res.status(201).json(rental)
  }
}

export { CreateRentalController }
