import { Specification } from '../infra/typeorm/entities/Specification'

interface ICreateSpecificationDTO {
  name: string
  description: string
}

interface ISpecificationRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<void>
  findByName(name: string): Promise<Specification>
  findByIds(ids: string[]): Promise<Specification[]>
}

export { ISpecificationRepository, ICreateSpecificationDTO }
