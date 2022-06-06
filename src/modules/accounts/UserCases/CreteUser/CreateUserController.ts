import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { CreateUserUseCase } from './CreateUserUseCase'

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password, driver_license } = req.body
    const creteUserUseCase = container.resolve(CreateUserUseCase)

    await creteUserUseCase.execute({
      name,
      email,
      password,
      driver_license,
    })

    return res.status(201).send()
  }
}

export { CreateUserController }
