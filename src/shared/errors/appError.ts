// class para customizar os errors
export class AppError {
  public readonly message: string
  // readonly serve para marcar uma propriedade para apenas de leitura e que apenas pode ser atribuida um valor dentro do construtor
  public readonly statusCode: number

  constructor(message: string, statusCode = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}
