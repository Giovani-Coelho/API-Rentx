import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('categories')
class Category {
  @PrimaryColumn()
  id?: string

  @Column()
  name: string

  @Column()
  description: string
  // createDateColumn eh proprio para uso em datas
  @CreateDateColumn()
  created_at: Date

  // se for fazer um put, nao quero que as rotas que utilizarem esse type criem outro id
  constructor() {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Category }
