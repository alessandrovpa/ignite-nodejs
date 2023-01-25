import { ICarRepository } from '@car/repositories/ICarRepository';
import { InMemoryCarRepository } from '@car/repositories/inMemory/CarRepository';

import AppError from '@shared/errors/AppError';

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

  test('the created car must have available as true by default', async () => {
    const cars = await carRepository.list();

    expect(cars[0].available).toBe(true);
  });

  it('should not be able to create a new car with same licence plate', async () => {
    await expect(async () => {
      await createCarService.execute({
        name: carFields.name,
        description: carFields.description,
        dailyRate: carFields.dailyRate,
        licencePlate: carFields.licencePlate,
        fineAmount: carFields.fineAmount,
        brand: carFields.brand,
        categoryId: carFields.categoryId,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
