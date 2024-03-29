import { container } from 'tsyringe'

import './providers'

import { UserRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { UserTokensRepository } from '../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository'
import { IUserRepository } from '../../modules/accounts/Repositories/IUserRepository'
import { IUsersTokensRepository } from '../../modules/accounts/Repositories/IUsersTokensRepository'
import { CarsImagesRepository } from '../../modules/cars/infra/typeorm/repositories/CarsImagesRepository'
import { CarsRepository } from '../../modules/cars/infra/typeorm/repositories/CarsRepository'
import { CategoriesRepository } from '../../modules/cars/infra/typeorm/repositories/CategoriesRepositorys'
import { SpecificationsRepository } from '../../modules/cars/infra/typeorm/repositories/SpecificationRepository'
import { ICarsImagesRepository } from '../../modules/cars/repositories/ICarsImageRepository'
import { ICarsRepository } from '../../modules/cars/repositories/ICarsRepository'
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository'
import { ISpecificationRepository } from '../../modules/cars/repositories/ISpecificationRepository'
import { RentalsRepository } from '../../modules/rentals/infra/typeorm/repositories/RentalsRepository'
import { IRentalsRepository } from '../../modules/rentals/repositories/IRentalsRepository'

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

container.registerSingleton<ICarsRepository>('CarsRepository', CarsRepository)

container.registerSingleton<ICarsImagesRepository>(
  'CarsImagesRepository',
  CarsImagesRepository,
)

container.registerSingleton<IRentalsRepository>(
  'RentalsRepository',
  RentalsRepository,
)

container.registerSingleton<IUsersTokensRepository>(
  'UsersTokensRepository',
  UserTokensRepository,
)
