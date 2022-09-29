import { inject, injectable } from 'tsyringe'

import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

@injectable()
class ListRentalByUserUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}
  public async execute(user_id: string): Promise<Rental[]> {
    const rentalByUser = await this.rentalsRepository.findByUser(user_id)

    return rentalByUser
  }
}

export { ListRentalByUserUseCase }
