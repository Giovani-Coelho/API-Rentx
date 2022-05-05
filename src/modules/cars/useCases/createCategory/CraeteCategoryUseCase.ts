import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IRequest {
  name: string
  description: string
}

class CreateCategoryUseCase {
  // aqui vai ser onde da acesso ao repositorio. A classe nao precisa saber de algo concreto mas apenas de uma interface, apenas oq ela retorna
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest): void {
    // verifica se ja existe a categoria de carro colocada, sendo que nao pode ter mais de 1
    const categoryAlreadyExists = this.categoriesRepository.findByName(name)
    // faz a validacao se ja existe a categoria de carro
    if (categoryAlreadyExists) {
      throw new Error('Category already exists!')
    }

    this.categoriesRepository.create({ name, description })
  }
}

export { CreateCategoryUseCase }
