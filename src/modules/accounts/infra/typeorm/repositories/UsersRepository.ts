import { getRepository, Repository } from 'typeorm'

import { ICreteUserDTO } from '@src/modules/accounts/dtos/ICreateUserDTO'
import { IUserRepository } from '@src/modules/accounts/Repositories/IUserRepository'

import { User } from '../entities/User'

class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  public async create({
    name,
    email,
    password,
    driver_license,
    avatar,
    id,
  }: ICreteUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
      avatar,
      id,
    })

    await this.repository.save(user)
  }

  public async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email })

    return user
  }

  public async findById(id: string): Promise<User> {
    const user = await this.repository.findOne({ id })

    return user
  }
}

export { UserRepository }
