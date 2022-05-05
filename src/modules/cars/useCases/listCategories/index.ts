import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepositorys'
import { ListCategoriesController } from './ListCategoriesController'
import { ListCategoriesUseCases } from './ListCategoriesUseCase'

const categoriesRepository = CategoriesRepository.getInstance()
const listCategoriesUseCase = new ListCategoriesUseCases(categoriesRepository)
const listCategoriesController = new ListCategoriesController(
  listCategoriesUseCase,
)

export { listCategoriesController }
