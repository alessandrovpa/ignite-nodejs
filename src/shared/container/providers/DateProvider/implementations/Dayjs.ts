import dayjs from 'dayjs';

import { IDateProvider } from '../IDateProvider';

class DayjsProvider implements IDateProvider {
  compareDateInHours(endDate: Date, startDate?: Date): number {
    const startDateToCompare = startDate || new Date();

    const compare = dayjs(endDate)
      .startOf('hour')
      .diff(dayjs(startDateToCompare).startOf('hour'), 'hours');

    return compare;
  }
}

export { DayjsProvider };
