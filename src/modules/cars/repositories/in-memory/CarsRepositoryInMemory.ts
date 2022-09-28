import { ICreateCarDTO } from '../../dtos/ICreateCarDTO'
import { Car } from '../../infra/typeorm/entities/Car'
import { ICarsRepository } from '../ICarsRepository'

class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = []
  public async create({
    name,
    category_id,
    brand,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car()

    Object.assign(car, {
      name,
      category_id,
      brand,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      id,
    })

    this.cars.push(car)

    return car
  }

  public async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate)
  }

  public async findAvailable(
    brand?: string,
    category_id?: string,
    name?: string,
  ): Promise<Car[]> {
    const cars = this.cars.filter(car => {
      if (
        car.available === true ||
        (brand && car.brand === brand) ||
        (category_id && car.category_id === category_id) ||
        (name && car.name === name)
      ) {
        return car
      }

      return null
    })

    return cars
  }

  public async findById(id: string): Promise<Car> {
    return this.cars.find(car => car.id === id)
  }

  public async updateAvailable(id: string, available: boolean): Promise<void> {
    const findIndex = this.cars.findIndex(car => car.id === id)
    this.cars[findIndex].available = available
  }
}

export { CarsRepositoryInMemory }
