import { Request, Response } from 'express'

import { CreateSpecificationUseCase } from './CreateSpecificationUseCase'

class CreateSpecificationController {
  constructor(private creteSpecificationUseCase: CreateSpecificationUseCase) {}

  handle(req: Request, res: Response) {
    const { name, description } = req.body

    this.creteSpecificationUseCase.execute({ name, description })

    return res.status(201).send()
  }
}

export { CreateSpecificationController }
