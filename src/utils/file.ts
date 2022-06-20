import fs from 'fs'

// filename eh o caminho que o arquivo se encontra
export const deleteFile = async (filename: string) => {
  try {
    // verificar se o arquivo existe
    await fs.promises.stat(filename)
  } catch {
    // se nao existir
    return
  }
  // remove o arquivo
  await fs.promises.unlink(filename)
}
