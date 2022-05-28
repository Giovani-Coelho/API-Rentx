import { ICreteUserDTO } from '../dtos/ICreateUserDTO'

interface IUserRepository {
  create(data: ICreteUserDTO): Promise<void>
}

export { IUserRepository }
