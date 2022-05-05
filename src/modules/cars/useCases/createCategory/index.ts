import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepositorys'
import { CreateCategoryUseCase } from './CraeteCategoryUseCase'
import { CreateCategoryController } from './CreateCategoryController'
// neste arquivo vai ficar as instancias
const categoriesRepository = CategoriesRepository.getInstance()

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
)

export { createCategoryController }
