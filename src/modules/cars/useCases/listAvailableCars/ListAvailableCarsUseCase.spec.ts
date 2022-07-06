import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let listCarsUseCase: ListAvailableCarsUseCase
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory)
  })

  it('Should be able list to all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'cartest',
      description: 'Carro test',
      daily_rate: 90,
      license_plate: 'DEF-1121',
      fine_amount: 100,
      brand: 'car_test',
      category_id: 'categori_id',
    })

    const cars = await listCarsUseCase.execute({})

    expect(cars).toEqual([car])
  })

  it('Should be able to list all abailable cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'cartest',
      description: 'Carro test',
      daily_rate: 90,
      license_plate: 'DEF-1121',
      fine_amount: 100,
      brand: 'car_test_brand',
      category_id: 'categori_id',
    })

    const cars = await listCarsUseCase.execute({
      brand: 'Car_brand',
    })

    expect(cars).toEqual([car])
  })

  it('Should be able to list all abailable cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car3',
      description: 'Carro test',
      daily_rate: 90,
      license_plate: 'DEF-2222',
      fine_amount: 100,
      brand: 'car_test_brand',
      category_id: 'categori_id',
    })

    const cars = await listCarsUseCase.execute({
      name: 'Car3',
    })

    expect(cars).toEqual([car])
  })

  it('Should be able to list all abailable cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'cartest',
      description: 'Carro test',
      daily_rate: 90,
      license_plate: 'DEF-1121',
      fine_amount: 100,
      brand: 'car_test_brand',
      category_id: '12345',
    })

    const cars = await listCarsUseCase.execute({
      category_id: '12345',
    })

    expect(cars).toEqual([car])
  })
})
