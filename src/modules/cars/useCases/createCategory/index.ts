import { CategoriesRepository } from '../../repositories/CategoriesRepositorys'
import { CreateCategoryUseCase } from './CraeteCategoryUseCase'
import { CreateCategoryController } from './CreateCategoryController'
// neste arquivo vai ficar as instancias
const categoriesRepository = new CategoriesRepository()

const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase,
)

export { createCategoryController }
