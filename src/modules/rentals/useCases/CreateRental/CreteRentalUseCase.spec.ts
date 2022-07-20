import dayjs from 'dayjs'

import { DayJsDateProvider } from '../../../../shared/container/providers/DateProvider/implementations/DayJsDateProvider'
import { AppError } from '../../../../shared/errors/appError'
import { RentalsRepositoryInMemory } from '../../repositories/in-memory/RentalsRepositoryInMemory'
import { CreateRentalUseCase } from './CreateRentalUseCase'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayJsDateProvider: DayJsDateProvider

describe('Crete Rental', () => {
  const dayAdd24Hours = dayjs().add(1, 'day').toDate()
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    dayJsDateProvider = new DayJsDateProvider()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
    )
  })

  it('should be able to crete a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expect_return_date: dayAdd24Hours,
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })

  it('should not be able to crete a new rental if there is another open to the same user', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expect_return_date: dayAdd24Hours,
      })

      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expect_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to crete a new rental if there is another open to the same car', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: 'test',
        expect_return_date: dayAdd24Hours,
      })

      await createRentalUseCase.execute({
        user_id: '321',
        car_id: 'test',
        expect_return_date: dayAdd24Hours,
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to crete a new rental with invalid return time ', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: 'test',
        expect_return_date: dayjs().toDate(),
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
