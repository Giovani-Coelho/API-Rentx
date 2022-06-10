import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../errors/appError'
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
    email,
    password,
    driver_license,
  }: ICreteUserDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new AppError('User already exists')
    }

    const passwordHash = await hash(password, 8)

    await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      driver_license,
    })
  }
}

export { CreateUserUseCase }
