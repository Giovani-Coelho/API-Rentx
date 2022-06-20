import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

import { AppError } from '../errors/appError'
import { UserRepository } from '../modules/accounts/Repositories/implementations/UsersRepository'

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

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  // pegar apenas o perametro necessario na posicao 1
  const [, token] = authHeader.split(' ')

  try {
    const { sub: user_id } = verify(
      token,
      '8a05d055b001399a55ce07215b68e692',
    ) as IPayload

    // verificar se o usuario existe no banco de dados
    const usersRepository = new UserRepository()
    const user = await usersRepository.findById(user_id)

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
