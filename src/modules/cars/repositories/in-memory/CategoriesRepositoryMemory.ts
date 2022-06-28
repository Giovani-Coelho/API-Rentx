import { Category } from '../../entities/Category'
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository'

class CategorioesRepositoryInMemory implements ICategoriesRepository {
  categories: Category[] = []

  public async findByName(name: string): Promise<Category> {
    const category = this.categories.find(category => category.name === name)
    return category
  }

  public async list(): Promise<Category[]> {
    const list = this.categories
    return list
  }

  public async create({
    name,
    description,
  }: ICreateCategoryDTO): Promise<void> {
    const category = new Category()

    Object.assign(category, {
      name,
      description,
    })

    this.categories.push(category)
  }
}

export { CategorioesRepositoryInMemory }
