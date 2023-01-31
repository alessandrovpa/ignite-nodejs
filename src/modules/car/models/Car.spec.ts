import Car from './Car';

describe('Car Model', () => {
  let car: Car;
  it('should be able to create a new car object with as little information as possible', () => {
    car = new Car({
      name: 'car-name',
      description: 'car-description',
      dailyRate: 100,
      licencePlate: '123-ABC',
      fineAmount: 50,
      brand: 'car-brand',
      categoryId: 'category-id',
    });

    expect(car).toHaveProperty('id');
    expect(car).toHaveProperty('createdAt');
    expect(car).toHaveProperty('updatedAt');
    expect(car).toHaveProperty('available');
  });

  it('should be able to create a new car object with full information', () => {
    const newCar = new Car({
      name: car.name,
      description: car.description,
      dailyRate: car.dailyRate,
      licencePlate: car.licencePlate,
      fineAmount: car.fineAmount,
      brand: car.brand,
      categoryId: car.categoryId,
      id: car.id,
      available: car.available,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt,
    });

    expect(newCar).toMatchObject(car);
  });
});
