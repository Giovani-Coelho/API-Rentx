import { container } from 'tsyringe'

import { IDateProvider } from './DateProvider/IDateProvider'
import { DayJsDateProvider } from './DateProvider/implementations/DayJsDateProvider'

container.registerSingleton<IDateProvider>(
  'DayJsDateProvider',
  DayJsDateProvider,
)
