import { getRepository, Repository } from 'typeorm'

import { ICreateUserTokenDTO } from '../../../dtos/ICreateUserTokenDTO'
import { IUsersTokensRepository } from '../../../Repositories/IUsersTokensRepository'
import { UserTokens } from '../entities/UserTokens'

class UserTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserTokens>

  constructor() {
    this.repository = getRepository(UserTokens)
  }

  public async deleteById(id: string): Promise<void> {
    await this.repository.delete({ id })
  }

  public async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    const usersTokens = await this.repository.findOne({
      user_id,
      refresh_token,
    })
    return usersTokens
  }

  public async create({
    user_id,
    expires_date,
    refresh_token,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.repository.create({
      expires_date,
      refresh_token,
      user_id,
    })

    await this.repository.save(userToken)

    return userToken
  }
}

export { UserTokensRepository }
