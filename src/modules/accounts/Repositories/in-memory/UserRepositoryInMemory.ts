import { ICreteUserDTO } from '../../dtos/ICreateUserDTO'
import { User } from '../../infra/typeorm/entities/User'
import { IUserRepository } from '../IUserRepository'

class UserRepositoryInMemory implements IUserRepository {
  users: User[] = []

  public async create({
    email,
    password,
    driver_license,
    name,
  }: ICreteUserDTO): Promise<void> {
    const user = new User()

    Object.assign(user, {
      email,
      password,
      driver_license,
      name,
    })

    this.users.push(user)
  }
  public async findByEmail(email: string): Promise<User> {
    return this.users.find(user => user.email === email)
  }
  public async findById(id: string): Promise<User> {
    return this.users.find(user => user.id === id)
  }
}

export { UserRepositoryInMemory }
