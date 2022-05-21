import { parse as csvParse } from 'csv-parse'
import fs from 'fs'

import { ICategoriesRepository } from '../../repositories/ICategoriesRepository'

interface IImportCategory {
  name: string
  description: string
}

class ImportCategoryUseCase {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  // faz a leitura das categorias
  loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return new Promise((resolve, reject) => {
      // permite fazer leitura do arquivo em partes, e passa como parametro qual o caminho do arquivo que deve ser lido
      const stream = fs.createReadStream(file.path)

      const categories: IImportCategory[] = []

      const parseFile = csvParse()

      // pega oq foi lido e oassa para dentro do parseFile
      stream.pipe(parseFile)

      parseFile
        .on('data', async line => {
          const [name, description] = line
          categories.push({
            name,
            description,
          })
        })
        .on('end', () => {
          // apos executar exclua o arquivo
          fs.promises.unlink(file.path)
          resolve(categories)
        })
        .on('error', err => {
          reject(err)
        })
    })
  }

  async execute(file: Express.Multer.File): Promise<void> {
    const categories = await this.loadCategories(file)

    categories.map(async category => {
      const { name, description } = category

      // verifica se exist alguma categoria com esse nome
      const existCategory = this.categoriesRepository.findByName(name)
      // se nao existir crie
      if (!existCategory) {
        this.categoriesRepository.create({
          name,
          description,
        })
      }
    })
  }
}

export { ImportCategoryUseCase }
