import { getRepository, Repository } from 'typeorm'

import { ICreateRentalDTO } from '../../../dtos/ICreateRentalDTO'
import { IRentalsRepository } from '../../../repositories/IRentalsRepository'
import { Rental } from '../entities/Rental'

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>

  constructor() {
    this.repository = getRepository(Rental)
  }

  public async findByUser(user_id: string): Promise<Rental[]> {
    const user = await this.repository.find({
      where: { user_id },
      relations: ['car'],
    })
    return user
  }

  public async findById(id: string): Promise<Rental> {
    const rental_id = await this.repository.findOne({ id })
    return rental_id
  }

  public async findOpenRentalByCar(car_id: string): Promise<Rental> {
    const openByCar = await this.repository.findOne({
      where: { car_id, end_date: null },
    })
    return openByCar
  }

  public async findOpenRentalByUser(user_id: string): Promise<Rental> {
    const openByUser = await this.repository.findOne({
      where: { user_id, end_date: null },
    })
    return openByUser
  }

  public async create({
    car_id,
    user_id,
    expect_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      expect_return_date,
      user_id,
      id,
      end_date,
      total,
    })

    await this.repository.save(rental)

    return rental
  }
}

export { RentalsRepository }
