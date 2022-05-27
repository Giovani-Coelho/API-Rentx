import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateCategoryUseCase } from './CraeteCategoryUseCase'

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body
    // faz a injecao da dependencia do createcategoryUseCase
    const createCategoryUseCase = container.resolve(CreateCategoryUseCase)

    await createCategoryUseCase.execute({ name, description })

    return res.status(201).send()
  }
}

export { CreateCategoryController }
