import Car from '@car/models/Car';
import Specification from '@car/models/Specification';
import { ICarRepository } from '@car/repositories/ICarRepository';
import { InMemoryCarRepository } from '@car/repositories/inMemory/CarRepository';
import { InMemorySpecificationRepository } from '@car/repositories/inMemory/SpecificationRepository';
import { ISpecificationRepository } from '@car/repositories/ISpecificationRepository';

import AppError from '@shared/errors/AppError';

import { CreateCarSpecificationService } from './CreateCarSpecificationService';

let carRepository: ICarRepository;
let specificationRepository: ISpecificationRepository;
let createCarSpecificationService: CreateCarSpecificationService;

describe('Create Car Specification Service', () => {
  const carFields = {
    name: 'name',
    description: 'description',
    dailyRate: 100,
    licencePlate: '123-ABCD',
    fineAmount: 50,
    brand: 'band',
    categoryId: 'category-id',
  };

  const specificationsId: string[] = [];
  let carId = '';

  beforeAll(() => {
    carRepository = new InMemoryCarRepository();
    specificationRepository = new InMemorySpecificationRepository();
    createCarSpecificationService = new CreateCarSpecificationService(
      carRepository,
      specificationRepository
    );
  });

  it('should be able to add a new specification to an registered car', async () => {
    const car = new Car({
      name: carFields.name,
      description: carFields.description,
      dailyRate: carFields.dailyRate,
      licencePlate: carFields.licencePlate,
      fineAmount: carFields.fineAmount,
      brand: carFields.brand,
      categoryId: carFields.categoryId,
    });
    await carRepository.save(car);
    carId = car.id;

    let specification = new Specification({
      name: 'specification1',
      description: 'description',
    });
    specificationsId.push(specification.id);
    await specificationRepository.save(specification);

    specification = new Specification({
      name: 'specification2',
      description: 'description',
    });
    specificationsId.push(specification.id);
    await specificationRepository.save(specification);

    await createCarSpecificationService.execute({
      carId,
      specificationsId,
    });

    const verifyCar = await carRepository.findById(carId);

    expect(verifyCar).toHaveProperty(['specifications']);
    expect(verifyCar.specifications).toHaveLength(2);
  });

  it('should not be able to add a new specification to an unregistered car', async () => {
    await expect(async () => {
      await createCarSpecificationService.execute({
        carId: 'non-exist',
        specificationsId: ['abc'],
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to add an duplicated specification to an registered car', async () => {
    specificationsId.push(specificationsId[0]);

    expect(specificationsId).toHaveLength(3);

    await createCarSpecificationService.execute({
      carId,
      specificationsId,
    });

    const verifyCar = await carRepository.findById(carId);

    expect(verifyCar).toHaveProperty(['specifications']);
    expect(verifyCar.specifications).toHaveLength(2);
  });
});
