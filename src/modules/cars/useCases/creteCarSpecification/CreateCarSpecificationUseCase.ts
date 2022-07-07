import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../shared/errors/appError'
import { ICarsRepository } from '../../repositories/ICarsRepository'

interface IRequest {
  car_id: string
  specifications_id: string[]
}

// @injectable()
class CreateCarsSpecificationUseCase {
  constructor(
    // @inject("CarsRepository")
    private carsRepository: ICarsRepository,
  ) {}

  public async execute({ car_id, specifications_id }: IRequest): Promise<void> {
    const carExists = await this.carsRepository.findById(car_id)

    if (!carExists) {
      throw new AppError('Car does not exists!')
    }
  }
}

export { CreateCarsSpecificationUseCase }
