import { Router } from 'express'
import multer from 'multer'

import { CreateCategoryController } from '../../../../modules/cars/useCases/createCategory/CreateCategoryController'
import { ImportCategoryController } from '../../../../modules/cars/useCases/importCategory/ImportCategoryController'
import { ListCategoriesController } from '../../../../modules/cars/useCases/listCategories/ListCategoriesController'
import { ensureAdmin } from '../middlewares/ensureAdmin'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated'

const categoriesRoutes = Router()
// passar qual o destino onde vai ser salvo, usa-lo como middleware
const upload = multer({
  dest: './tmp',
})

const createCategoryController = new CreateCategoryController()
const importCategoryController = new ImportCategoryController()
const listCategoriesController = new ListCategoriesController()

// barra se referencia ao /categories
categoriesRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCategoryController.handle,
)
// responsavel por pegar e listar os objetos do banco de dados
categoriesRoutes.get('/', listCategoriesController.handle)
// passa o middleware e falar que vai ser importado apenas um arquivo e passado o nome do arquivo
categoriesRoutes.post(
  '/import',
  upload.single('file'),
  ensureAuthenticated,
  ensureAdmin,
  importCategoryController.handle,
)

export { categoriesRoutes }
