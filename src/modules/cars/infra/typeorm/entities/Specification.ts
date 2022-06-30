import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('specifications')
class Specification {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  description: string

  @CreateDateColumn()
  created_at: Date

  // se for fazer um put, nao quero que as rotas que utilizarem esse type criem outro id
  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Specification }
