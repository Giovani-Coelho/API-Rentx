import { inject, injectable } from 'tsyringe'

import { ICarsImagesRepository } from '../../repositories/ICarsImageRepository'

interface IRequest {
  car_id: string
  image_name: string[]
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository,
  ) {}

  public async execute({ car_id, image_name }: IRequest): Promise<void> {
    image_name.map(async image => {
      await this.carsImagesRepository.create(car_id, image)
    })
  }
}

export { UploadCarImageUseCase }
