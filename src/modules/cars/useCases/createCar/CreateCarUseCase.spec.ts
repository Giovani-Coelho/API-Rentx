import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { CreateCarUseCase } from './CreateCarUseCase'

let createCarUseCase: CreateCarUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Crete Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
  })

  it('Should be able to craete a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'Name Car',
      description: 'Description Car',
      daily_rate: 100,
      license_plate: 'ABC-123',
      fine_amount: 60,
      brand: 'Brand',
      category_id: 'category',
    })

    expect(car).toHaveProperty('id')
  })

  it('should not be able to crete a car with exists license plate', () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: 'Car1',
        description: 'Description Car',
        daily_rate: 100,
        license_plate: 'ABC-123',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      })

      await createCarUseCase.execute({
        name: 'Car2',
        description: 'Description Car',
        daily_rate: 100,
        license_plate: 'ABC-123',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      })
    })
  })

  it('should not be able to crete a car with available true by default', async () => {
    expect(async () => {
      const car = await createCarUseCase.execute({
        name: 'Car1',
        description: 'Description Car',
        daily_rate: 100,
        license_plate: 'ABC-123',
        fine_amount: 60,
        brand: 'Brand',
        category_id: 'category',
      })

      expect(car.available).toBe(true)
    })
  })
})
