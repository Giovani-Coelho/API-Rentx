import { container } from 'tsyringe'

import { UserRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { IUserRepository } from '../../modules/accounts/Repositories/IUserRepository'
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepositorys'
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationRepository'
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
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

container.registerSingleton<IUserRepository>('UsersRepository', UserRepository)
