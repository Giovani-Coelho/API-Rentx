import { v4 as uuidv4 } from 'uuid'

class Rental {
  id: string

  car_id: string

  user_id: string

  start_date: Date

  end_date: Date

  expected_return_date: Date

  total: number

  created_at: Date

  update_at: Date

  constructor() {
    if (!this.id) {
      this.id = uuidv4()
    }
  }
}

export { Rental }
