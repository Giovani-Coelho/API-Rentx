import { inject, injectable } from 'tsyringe'

import { AppError } from '../../../../errors/appError'
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

//
@injectable()
class CreateCategoryUseCase {
  // aqui vai ser onde da acesso ao repositorio. A classe nao precisa saber de algo concreto mas apenas de uma interface, apenas oq ela retorna
  constructor(
    // faz uma varredura no container do tsynge e olha qual classe ele esta referenciando
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    // verifica se ja existe a categoria de carro colocada, sendo que nao pode ter mais de 1
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    )
    // faz a validacao se ja existe a categoria de carro
    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!')
    }

    await this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
