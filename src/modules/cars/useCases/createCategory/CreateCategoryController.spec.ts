import request from 'supertest'

import { app } from '../../../../shared/infra/http/app'

describe('Create Category Controller', () => {
  it('Should be able to create a new category', async () => {
    const response = await request(app).post('/categories').send({
      name: 'Category supertest',
      description: 'Category Supertest',
    })

    expect(response.status).toBe(201)
  })
})
