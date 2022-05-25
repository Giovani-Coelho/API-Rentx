import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepositorys'
import { ImportCategoryController } from './ImportCategoryController'
import { ImportCategoryUseCase } from './ImportCategoryUseCase'

export default (): ImportCategoryController => {
  const categoriesRepository = new CategoriesRepository()
  const importCategoryUseCase = new ImportCategoryUseCase(categoriesRepository)
  const importCategoryController = new ImportCategoryController(
    importCategoryUseCase,
  )

  return importCategoryController
}
