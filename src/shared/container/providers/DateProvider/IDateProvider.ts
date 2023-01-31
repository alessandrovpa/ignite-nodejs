interface IDateProvider {
  compareDateInHours(endDate: Date, startDate?: Date): number;
}

export { IDateProvider };
