import { container } from 'tsyringe'

import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepositorys'
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationRepository'
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository'

// IcategoriesRepository
container.registerSingleton<ICategoriesRepository>(
  // nome do container
  'CategoriesRepository',
  // a classe que quer chamar
  CategoriesRepository,
)

// ISpecificationsRepository
container.registerSingleton<ISpecificationRepository>(
  // nome do container
  'SpecificationRepository',
  // a classe que quer chamar
  SpecificationsRepository,
)
