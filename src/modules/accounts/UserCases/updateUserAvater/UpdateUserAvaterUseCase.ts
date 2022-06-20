import { inject, injectable } from 'tsyringe'

import { deleteFile } from '../../../../utils/file'
import { IUserRepository } from '../../Repositories/IUserRepository'

interface IRequest {
  user_id: string
  avatarFile: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private UserRepository: IUserRepository,
  ) {}

  public async execute({ user_id, avatarFile }: IRequest): Promise<void> {
    const user = await this.UserRepository.findById(user_id)

    // passando o caminho e o nome do arquivo para a funcao
    await deleteFile(`./tmp/avatar/${user.avatar}`)
    user.avatar = avatarFile

    await this.UserRepository.create(user)
  }
}

export { UpdateUserAvatarUseCase }
