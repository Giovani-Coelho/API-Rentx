import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '../../../../shared/errors/appError'
import { Rental } from '../../infra/typeorm/entities/Rental'
import { IRentalsRepository } from '../../repositories/IRentalsRepository'

interface IRequest {
  user_id: string
  car_id: string
  expect_return_date: Date
}

class CreateRentalUseCase {
  constructor(
    private rentalsRepository: IRentalsRepository,
    private dateProvider: IDateProvider,
  ) {}

  public async execute({
    user_id,
    car_id,
    expect_return_date,
  }: IRequest): Promise<Rental> {
    const minimumHour = 24
    // nao deve ser possivel cadastrar um novo aluguel de caso ja exista um em aberto para o mesmo carro
    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id,
    )

    if (carUnavailable) {
      throw new AppError('Car is unavailable')
    }

    // nao deve ser possivel cadastrar um novo aluguel caso ja exista um aerto para o mesmo usuario

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id,
    )

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for user!")
    }

    // O aluguel deve ter duracao minima de 24horas

    const dateNow = this.dateProvider.dateNow()

    // compara se o expect_return_date eh diferente
    const compare = this.dateProvider.compareInHours(
      dateNow,
      expect_return_date,
    )

    if (compare < minimumHour) {
      throw new AppError('Invalid return time!')
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expect_return_date,
    })

    return rental
  }
}

export { CreateRentalUseCase }
