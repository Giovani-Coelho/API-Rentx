import { resolve } from 'path'
import { inject, injectable } from 'tsyringe'
import { v4 as uuidv4 } from 'uuid'

import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { IMailProvider } from '../../../../shared/container/providers/MailProvider/IMailProvider'
import { AppError } from '../../../../shared/errors/appError'
import { IUserRepository } from '../../Repositories/IUserRepository'
import { IUsersTokensRepository } from '../../Repositories/IUsersTokensRepository'

@injectable()
class SendForgotPasswordMailUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayJsDateProvider')
    private dateProvider: IDateProvider,
    @inject('EtherealMailProvider')
    private mailProvider: IMailProvider, // eslint-disable-next-line prettier/prettier
  ) { }

  public async execute(email: string): Promise<void> {
    const user = await this.usersRepository.findByEmail(email)

    const templatePath = resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgotPassword.hbs',
    )

    if (!user) {
      throw new AppError('User does not exists!')
    }

    const token = uuidv4()

    const expires_date = this.dateProvider.addHours(3)

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date,
    })

    const variables = {
      name: user.name,
      link: `${process.env.FORGOT_MAIL_URL}${token}`,
    }

    await this.mailProvider.sendMail(
      email,
      'Recuperar senha',
      variables,
      templatePath,
    )
  }
}

export { SendForgotPasswordMailUseCase }
