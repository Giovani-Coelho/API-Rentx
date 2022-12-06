import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '../../../../shared/errors/appError'
import { IUserRepository } from '../../Repositories/IUserRepository'
import { IUsersTokensRepository } from '../../Repositories/IUsersTokensRepository'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private userRepository: IUserRepository, // eslint-disable-next-line prettier/prettier
  ) { }

  public async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError('token invalid!')
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expires_date,
        this.dateProvider.dateNow(),
      )
    ) {
      throw new AppError('token expired!')
    }

    const user = await this.userRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)

    await this.userRepository.create(user)

    await this.usersTokensRepository.deleteById(userToken.id)
  }
}

export { ResetPasswordUserUseCase }
