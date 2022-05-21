import { Request, Response } from 'express'

import { ListCategoriesUseCases } from './ListCategoriesUseCase'

class ListCategoriesController {
  constructor(private listCategoryUseCase: ListCategoriesUseCases) {}

  handle(req: Request, res: Response): Response {
    const all = this.listCategoryUseCase.execute()

    return res.json(all)
  }
}

export { ListCategoriesController }
