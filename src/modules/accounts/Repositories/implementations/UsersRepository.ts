import { getRepository, Repository } from 'typeorm'

import { ICreteUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../entities/User'
import { IUserRepository } from '../IUserRepository'

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
  }: ICreteUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      email,
      password,
      driver_license,
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
