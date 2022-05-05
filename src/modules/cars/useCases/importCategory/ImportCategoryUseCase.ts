import fs from 'fs'
import { parse as csvParse } from 'csv-parse'

class ImportCategoryUseCase {
  execute(file: Express.Multer.File): void {
    //permite fazer leitura do arquivo em partes, e passa como parametro qual o caminho do arquivo que deve ser lido
    const stream = fs.createReadStream(file.path)
    //
    const parseFile = csvParse()

    // pega oq foi lido e oassa para dentro do parseFile
    stream.pipe(parseFile)

    parseFile.on('data', async line => {
      console.log(line)
    })
  }
}

export { ImportCategoryUseCase }
