import { inject, injectable } from 'tsyringe'

import { ICreteUserDTO } from '../../dtos/ICreateUserDTO'
import { IUserRepository } from '../../Repositories/IUserRepository'

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({
    name,
    username,
    email,
    password,
    driver_license,
  }: ICreteUserDTO): Promise<void> {
    await this.userRepository.create({
      name,
      username,
      email,
      password,
      driver_license,
    })
  }
}

export { CreateUserUseCase }
