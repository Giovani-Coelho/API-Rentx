import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepositorys'
import { CreateCategoryUseCase } from './CraeteCategoryUseCase'
import { CreateCategoryController } from './CreateCategoryController'
// neste arquivo vai ficar as instancias

export default (): CreateCategoryController => {
  const categoriesRepository = new CategoriesRepository()

  const createCategoryUseCase = new CreateCategoryUseCase(categoriesRepository)

  const createCategoryController = new CreateCategoryController(
    createCategoryUseCase,
  )

  return createCategoryController
}
