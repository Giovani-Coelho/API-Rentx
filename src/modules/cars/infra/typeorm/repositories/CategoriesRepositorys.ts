import { getRepository, Repository } from 'typeorm'

import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../../../repositories/ICategoriesRepository'
import { Category } from '../entities/Category'

// DTO -> Data transfer object

class CategoriesRepository implements ICategoriesRepository {
  // faz com que seja proprio apenas desta classe
  private repository: Repository<Category>

  // faz com que Category seja inicializada quando for uma instancia
  constructor() {
    this.repository = getRepository(Category)
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      // atribui todas as propriedades para o objeto category
      name,
      description,
    })

    await this.repository.save(category)
  }
  // lista o banco de dados
  async list(): Promise<Category[]> {
    const categories = await this.repository.find()

    return categories
  }
  // verifica se ja existe a categoria de carro colocada
  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name })
    return category
  }
}

export { CategoriesRepository }
