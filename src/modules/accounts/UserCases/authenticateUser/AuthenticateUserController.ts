import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { AuthenticateUserUsecase } from './AuthenticateUserUseCase'

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body

    const authenticateUserUseCase = container.resolve(AuthenticateUserUsecase)

    const token = await authenticateUserUseCase.execute({
      password,
      email,
    })

    return res.json(token)
  }
}

export { AuthenticateUserController }
