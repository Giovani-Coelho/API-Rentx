import { Request, Response } from 'express'
import { container } from 'tsyringe'

import { ResetPasswordUserUseCase } from './ResetPasswordUseCase'

class ResetPasswordUserController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { token } = req.query
    const { password } = req.body
    const resetPasswordUserUseCase = container.resolve(ResetPasswordUserUseCase)

    await resetPasswordUserUseCase.execute({ token: String(token), password })

    return res.send()
  }
}

export { ResetPasswordUserController }
