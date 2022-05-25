import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepositorys'
import { ListCategoriesController } from './ListCategoriesController'
import { ListCategoriesUseCases } from './ListCategoriesUseCase'

export default (): ListCategoriesController => {
  const categoriesRepository = new CategoriesRepository()
  const listCategoriesUseCase = new ListCategoriesUseCases(categoriesRepository)
  const listCategoriesController = new ListCategoriesController(
    listCategoriesUseCase,
  )

  return listCategoriesController
}
