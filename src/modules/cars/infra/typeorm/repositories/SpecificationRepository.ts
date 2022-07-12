import { getRepository, Repository } from 'typeorm'

import {
  ISpecificationRepository,
  ICreateSpecificationDTO,
} from '../../../repositories/ISpecificationRepository'
import { Specification } from '../entities/Specification'

// implementa a interface criada
class SpecificationsRepository implements ISpecificationRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification)
  }

  public async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      description,
      name,
    })

    await this.repository.save(specification)

    return specification
  }

  public async findByName(name: string): Promise<Specification> {
    const specification = this.repository.findOne({ name })

    return specification
  }

  public async findByIds(ids: string[]): Promise<Specification[]> {
    const specification = await this.repository.findByIds(ids)
    return specification
  }
}

export { SpecificationsRepository }
