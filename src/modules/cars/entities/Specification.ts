import { v4 as uuid } from 'uuid'

class Specification {
  id?: string
  name: string
  description: string
  created_at: Date

  // se for fazer um put, nao quero que as rotas que utilizarem esse type criem outro id
  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Specification }
