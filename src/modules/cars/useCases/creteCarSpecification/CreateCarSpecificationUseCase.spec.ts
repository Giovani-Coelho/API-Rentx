import { AppError } from '../../../../shared/errors/appError'
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { SpecificationInMemory } from '../../repositories/in-memory/SpecificationInMemory'
import { CreateCarsSpecificationUseCase } from './CreateCarSpecificationUseCase'

let createCarSpecificationUseCase: CreateCarsSpecificationUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory
let specificationsRepositoryInMemory: SpecificationInMemory

describe('Crete Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    specificationsRepositoryInMemory = new SpecificationInMemory()
    createCarSpecificationUseCase = new CreateCarsSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    )
  })

  it('Should be able to add a new specification to a now-existent car', async () => {
    expect(async () => {
      const car_id = '1234'
      const specifications_id = ['54321']

      await createCarSpecificationUseCase.execute({ car_id, specifications_id })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('Should be able to add a new specification to the car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'cartest',
      description: 'Carro test',
      daily_rate: 90,
      license_plate: 'DEF-1121',
      fine_amount: 100,
      brand: 'car_test',
      category_id: 'categori_id',
    })

    const specification = await specificationsRepositoryInMemory.create({
      description: 'teste',
      name: 'test',
    })

    const specifications_id = [specification.id]

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    })

    expect(specificationsCars).toHaveProperty('specifications')
    expect(specificationsCars.specifications.length).toBe(1)
  })
})
