import { inject, injectable } from 'tsyringe'

import { ISpecificationRepository } from '../../repositories/ISpecificationRepository'

interface IRequest {
  name: string
  description: string
}

@injectable()
class CreateSpecificationUseCase {
  // private serve para deixar disponivel para a classe toda
  constructor(
    @inject('SpecificationRepository')
    private specificationsRepository: ISpecificationRepository,
  ) {}

  async execute({ name, description }: IRequest): Promise<void> {
    const specificationAlreadyExists =
      await this.specificationsRepository.findByName(name)

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists!')
    }

    await this.specificationsRepository.create({
      name,
      description,
    })
  }
}

export { CreateSpecificationUseCase }
