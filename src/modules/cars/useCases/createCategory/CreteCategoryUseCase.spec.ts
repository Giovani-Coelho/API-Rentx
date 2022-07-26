import { AppError } from '../../../../shared/errors/appError'
import { CategorioesRepositoryInMemory } from '../../repositories/in-memory/CategoriesRepositoryMemory'
import { CreateCategoryUseCase } from './CraeteCategoryUseCase'

let createCategoryUseCase: CreateCategoryUseCase
let categorioesRepositoryInMemory: CategorioesRepositoryInMemory

describe('Crete Category', () => {
  beforeEach(() => {
    categorioesRepositoryInMemory = new CategorioesRepositoryInMemory()
    createCategoryUseCase = new CreateCategoryUseCase(
      categorioesRepositoryInMemory,
    )
  })

  it('Should be able to create a new category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description Test',
    }

    await createCategoryUseCase.execute({
      name: category.name,
      description: category.description,
    })

    const categoryCreted = await categorioesRepositoryInMemory.findByName(
      category.name,
    )

    expect(categoryCreted).toHaveProperty('id')
  })
  // testando o caso de erro:
  it('Should not be able to create a new category with name exists', async () => {
    expect(async () => {
      const category = {
        name: 'Category Test',
        description: 'Category description Test',
      }

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })

      await createCategoryUseCase.execute({
        name: category.name,
        description: category.description,
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
