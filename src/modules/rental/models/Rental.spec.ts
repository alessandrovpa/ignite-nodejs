import Rental from './Rental';

describe('Rental Model', () => {
  let rental: Rental;
  it('should be able to create a new rental object with as little information as possible', () => {
    rental = new Rental({
      carId: 'car-id',
      userId: 'user-id',
      expectedReturnDate: new Date(),
    });

    expect(rental).toHaveProperty('id');
    expect(rental).toHaveProperty('startDate');
    expect(rental).toHaveProperty('endDate');
    expect(rental).toHaveProperty('createdAt');
    expect(rental).toHaveProperty('updatedAt');
    expect(rental.endDate).toBe(null);
  });

  it('should be able to create a new rental object with full information', () => {
    const newRental = new Rental({
      id: rental.id,
      carId: rental.carId,
      userId: rental.userId,
      startDate: rental.startDate,
      endDate: rental.endDate,
      expectedReturnDate: rental.expectedReturnDate,
      createdAt: rental.createdAt,
      updatedAt: rental.updatedAt,
    });

    expect(newRental).toMatchObject(rental);
  });
});
