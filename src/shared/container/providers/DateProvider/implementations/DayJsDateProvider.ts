import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider } from '../IDateProvider'

dayjs.extend(utc)

class DayJsDateProvider implements IDateProvider {
  public compareIfBefore(start_date: Date, end_date: Date): boolean {
    return dayjs(start_date).isBefore(end_date)
  }

  public addHours(hours: number): Date {
    return dayjs().add(hours, 'hour').toDate()
  }

  public addDays(days: number) {
    return dayjs().add(days, 'days').toDate()
  }

  public compareInDays(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date)
    const start_date_utc = this.convertToUTC(start_date)

    return dayjs(end_date_utc).diff(start_date_utc, 'days')
  }

  public compareInHours(start_date: Date, end_date: Date): number {
    const end_date_utc = this.convertToUTC(end_date)
    const start_date_utc = this.convertToUTC(start_date)

    return dayjs(end_date_utc).diff(start_date_utc, 'hours')
  }

  public convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  public dateNow(): Date {
    return dayjs().toDate()
  }
}

export { DayJsDateProvider }
