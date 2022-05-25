import { Router } from 'express'
import multer from 'multer'

import createCategoryController from '../modules/cars/useCases/createCategory'
import importCategoryController from '../modules/cars/useCases/importCategory'
import listCategoriesController from '../modules/cars/useCases/listCategories'

const categoriesRoutes = Router()
// passar qual o destino onde vai ser salvo, usa-lo como middleware
const upload = multer({
  dest: './tmp',
})

// barra se referencia ao /categories
categoriesRoutes.post('/', (req, res) =>
  createCategoryController().handle(req, res),
)
// responsavel por pegar e listar os objetos do banco de dados
categoriesRoutes.get('/', (req, res) =>
  listCategoriesController().handle(req, res),
)
// passa o middleware e falar que vai ser importado apenas um arquivo e passado o nome do arquivo
categoriesRoutes.post('/import', upload.single('file'), (req, res) =>
  importCategoryController().handle(req, res),
)

export { categoriesRoutes }
