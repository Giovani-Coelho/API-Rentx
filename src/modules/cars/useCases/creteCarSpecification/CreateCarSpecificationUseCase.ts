import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../shared/errors/appError'
import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository } from '../../repositories/ICarsRepository'
import { ISpecificationRepository } from '../../repositories/ISpecificationRepository'

interface IRequest {
  car_id: string
  specifications_id: string[]
}

@injectable()
class CreateCarsSpecificationUseCase {
  constructor(
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationRepository,
  ) {}

  public async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
    const carExists = await this.carsRepository.findById(car_id)
    // se carro na existir:
    if (!carExists) {
      throw new AppError('Car does not exists!')
    }

    const specifications = await this.specificationsRepository.findByIds(
      specifications_id,
    )

    carExists.specifications = specifications

    await this.carsRepository.create(carExists)

    return carExists
  }
}

export { CreateCarsSpecificationUseCase }
