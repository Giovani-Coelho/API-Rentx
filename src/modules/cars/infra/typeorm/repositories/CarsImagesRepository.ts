import { getRepository, Repository } from 'typeorm'

import { ICarsImagesRepository } from '../../../repositories/ICarsImageRepository'
import { CarImage } from '../entities/CarImage'

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>

  constructor() {
    this.repository = getRepository(CarImage)
  }

  public async create(car_id: string, image_name: string): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name,
    })

    await this.repository.save(carImage)

    return carImage
  }
}

export { CarsImagesRepository }
