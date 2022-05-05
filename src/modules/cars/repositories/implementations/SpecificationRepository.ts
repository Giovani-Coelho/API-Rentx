import { Specification } from '../../model/Specification'
import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from '../ISpecificationRepository'

// implementa a interface criada
class SpecificationsRepository implements ISpecificationRepository {
  // passar quais eh a interface do array
  private specifications: Specification[]
  // iniciar o array
  constructor() {
    this.specifications = []
  }

  create({ name, description }: ICreateSpecificationDTO): void {
    const specification = new Specification()

    Object.assign(specification, {
      name,
      description,
      created_at: new Date(),
    })

    this.specifications.push(specification)
  }

  findByName(name: string): Specification {
    const specification = this.specifications.find(value => value.name === name)

    return specification
  }
}

export { SpecificationsRepository }
