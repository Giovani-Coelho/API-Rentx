import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ListRentalByUserUseCase } from './ListRentalByUserUseCase'

class ListRentalByUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.user
    const listRentalsByUserUseCase = container.resolve(ListRentalByUserUseCase)

    const rentals = await listRentalsByUserUseCase.execute(id)

    return res.status(200).json(rentals)
  }
}

export { ListRentalByUserController }
