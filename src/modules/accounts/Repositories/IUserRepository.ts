import { ICreteUserDTO } from '../dtos/ICreateUserDTO'
import { User } from '../entities/User'

interface IUserRepository {
  create(data: ICreteUserDTO): Promise<void>
  findByEmail(email: string): Promise<User>
}

export { IUserRepository }
