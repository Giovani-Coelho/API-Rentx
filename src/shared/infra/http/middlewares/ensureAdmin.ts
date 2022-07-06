import { Request, Response, NextFunction } from 'express'

import { UserRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { AppError } from '../../../errors/appError'

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { id } = req.user

  const userRepository = new UserRepository()
  const user = await userRepository.findById(id)

  if (!user.isAdmin) {
    throw new AppError("User isn't admin!")
  }

  return next()
}
