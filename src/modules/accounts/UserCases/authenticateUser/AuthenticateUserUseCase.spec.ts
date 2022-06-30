import { AppError } from '../../../../shared/errors/appError'
import { ICreteUserDTO } from '../../dtos/ICreateUserDTO'
import { UserRepositoryInMemory } from '../../Repositories/in-memory/UserRepositoryInMemory'
import { CreateUserUseCase } from '../CreteUser/CreateUserUseCase'
import { AuthenticateUserUsecase } from './AuthenticateUserUseCase'

let authenticateUserUseCase: AuthenticateUserUsecase
let usersRepositoryInmemory: UserRepositoryInMemory
let createUserUsecase: CreateUserUseCase

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInmemory = new UserRepositoryInMemory()
    authenticateUserUseCase = new AuthenticateUserUsecase(
      usersRepositoryInmemory,
    )
    createUserUsecase = new CreateUserUseCase(usersRepositoryInmemory)
  })

  it('Should be able to authenticate an user', async () => {
    const user: ICreteUserDTO = {
      driver_license: '001231',
      email: 'user@test.com',
      password: '1234',
      name: 'User Test',
    }
    // cria um usuario
    await createUserUsecase.execute(user)

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    })

    expect(result).toHaveProperty('token')
  })

  it('should not be able to authenticate a nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'test@gmail.com',
        password: '1263',
      })
    }).rejects.toBeInstanceOf(AppError)
  })

  it('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreteUserDTO = {
        driver_license: '9999',
        email: 'test@hota.com',
        password: '5123',
        name: 'User Test Error',
      }

      await createUserUsecase.execute(user)

      await authenticateUserUseCase.execute({
        email: user.email,
        password: 'incorrectPassword',
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
