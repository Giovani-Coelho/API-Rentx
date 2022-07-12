import { Specification } from '../../infra/typeorm/entities/Specification'
import {
  ICreateSpecificationDTO,
  ISpecificationRepository,
} from '../ISpecificationRepository'

class SpecificationInMemory implements ISpecificationRepository {
  specifications: Specification[] = []

  public async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification()
    Object.assign(specification, {
      description,
      name,
    })
    this.specifications.push(specification)

    return specification
  }
  public async findByName(name: string): Promise<Specification> {
    return this.specifications.find(
      specification => specification.name === name,
    )
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecifications = this.specifications.filter(specification =>
      ids.includes(specification.id),
    )

    return allSpecifications
  }
}

export { SpecificationInMemory }
