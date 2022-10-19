import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import auth from '../../../../config/auth'
import { UserRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository'
import { UserTokensRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersTokensRepository'
import { AppError } from '../../../errors/appError'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // para pegar o token de authentication
  const authHeader = req.headers.authorization
  const userTokensRepository = new UserTokensRepository()

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  // pegar apenas o perametro necessario na posicao 1
  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      auth.secret_refresh_token,
    ) as IPayload

    // verificar se o usuario existe no banco de dados
    const user = await userTokensRepository.findByUserIdAndRefreshToken(
      user_id,
      token,
    )

    if (!user) {
      throw new AppError('User does not exists!', 401)
    }

    req.user = {
      id: user_id,
    }

    next()
  } catch {
    throw new AppError('invalid token', 401)
  }
}
