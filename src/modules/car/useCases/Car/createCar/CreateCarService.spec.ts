import { ICarRepository } from '@car/repositories/ICarRepository';
import { InMemoryCarRepository } from '@car/repositories/inMemory/CarRepository';

import { CreateCarService } from './CreateCarService';

let createCarService: CreateCarService;
let carRepository: ICarRepository;

describe('Create Car Service', () => {
  const carFields = {
    name: 'name',
    description: 'description',
    dailyRate: 100,
    licencePlate: '123-ABCD',
    fineAmount: 50,
    brand: 'band',
    categoryId: 'category-id',
  };

  beforeAll(() => {
    carRepository = new InMemoryCarRepository();
    createCarService = new CreateCarService(carRepository);
  });
  it('should be able to create a new car', async () => {
    const car = await createCarService.execute({
      name: carFields.name,
      description: carFields.description,
      dailyRate: carFields.dailyRate,
      licencePlate: carFields.licencePlate,
      fineAmount: carFields.fineAmount,
      brand: carFields.brand,
      categoryId: carFields.categoryId,
    });

    const cars = await carRepository.list();

    expect(car).toHaveProperty('id');
    expect(cars).toHaveLength(1);
  });
});
