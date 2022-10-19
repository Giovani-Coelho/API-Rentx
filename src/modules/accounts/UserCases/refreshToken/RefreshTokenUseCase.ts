import { verify, sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'

import auth from '../../../../config/auth'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '../../../../shared/errors/appError'
import { IUsersTokensRepository } from '../../Repositories/IUsersTokensRepository'

interface IPayload {
  sub: string
  email: string
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private userTokensRepository: IUsersTokensRepository,
    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider, // eslint-disable-next-line prettier/prettier
  ) { }

  public async execute(token: string): Promise<string> {
    const { email, sub } = verify(token, auth.secret_refresh_token) as IPayload

    const user_id = sub

    const userToken =
      await this.userTokensRepository.findByUserIdAndRefreshToken(
        user_id,
        token,
      )

    if (!userToken) {
      throw new AppError('Refresh Token does not exists!')
    }

    await this.userTokensRepository.deleteById(userToken.id)

    const refresh_token = sign({ email }, auth.secret_refresh_token, {
      subject: sub,
      expiresIn: auth.expires_in_refresh_token,
    })

    const expires_date = this.dateProvider.addDays(
      auth.expires_refresh_token_days,
    )

    await this.userTokensRepository.create({
      expires_date,
      refresh_token,
      user_id,
    })

    return refresh_token
  }
}

export { RefreshTokenUseCase }
