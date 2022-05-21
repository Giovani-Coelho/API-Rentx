import { Category } from '../../model/Category'
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from '../ICategoriesRepository'

// DTO -> Data transfer object

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[]

  // eslint-disable-next-line no-use-before-define
  private static INSTANCE: CategoriesRepository

  // faz com que Category seja inicializa quando for uma instancia
  private constructor() {
    this.categories = []
  }

  public static getInstance(): CategoriesRepository {
    // caso nao tenha criado o banco de dados crie
    if (!CategoriesRepository.INSTANCE) {
      CategoriesRepository.INSTANCE = new CategoriesRepository()
    }
    // se ja tiver uma instancia criada retorna a ja criada
    return CategoriesRepository.INSTANCE
  }

  create({ name, description }: ICreateCategoryDTO): void {
    const category = new Category()

    // atribui todas as propriedades para o objeto category
    Object.assign(category, {
      name,
      description,
      created_at: new Date(),
    })
    // inseri os dados ao banco
    this.categories.push(category)
  }
  // lista o banco de dados
  list(): Category[] {
    return this.categories
  }
  // verifica se ja existe a categoria de carro colocada
  findByName(name: string): Category {
    const category = this.categories.find(category => category.name === name)
    return category
  }
}

export { CategoriesRepository }
