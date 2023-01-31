import User from '@accounts/models/User';
import { InMemoryUserRepository } from '@accounts/repositories/inMemory/UserRepository';
import { IUserRepository } from '@accounts/repositories/IUserRepository';
import Car from '@car/models/Car';
import { ICarRepository } from '@car/repositories/ICarRepository';
import { InMemoryCarRepository } from '@car/repositories/inMemory/CarRepository';
import { InMemoryRentalRepository } from '@rental/repositories/inMemory/RentalRepository';
import { IRentalRepository } from '@rental/repositories/IRentalRepository';

import AppError from '@shared/errors/AppError';

import { CreateRentalService } from './CreateRentalService';

let createRentalService: CreateRentalService;
let rentalRepository: IRentalRepository;
let userRepository: IUserRepository;
let carRepository: ICarRepository;

describe('Create Rental Service', () => {
  let userId: string;
  let carId: string;

  beforeAll(() => {
    rentalRepository = new InMemoryRentalRepository();
    userRepository = new InMemoryUserRepository();
    carRepository = new InMemoryCarRepository();
    createRentalService = new CreateRentalService(
      rentalRepository,
      carRepository,
      userRepository
    );
  });

  it('should be able to create a new rental', async () => {
    const user = new User({
      name: 'John Doe',
      email: 'john@doe.com',
      driverLicence: '123ABC',
      password: 'password',
    });
    await userRepository.save(user);
    userId = user.id;

    const car = new Car({
      name: 'some-car',
      brand: 'some-brand',
      categoryId: 'category-id',
      dailyRate: 100,
      description: 'car-description',
      fineAmount: 50,
      licencePlate: '123-ABCD',
    });
    await carRepository.save(car);
    carId = car.id;

    const rental = await createRentalService.execute({
      carId,
      userId,
      expectedReturnDate: new Date(),
    });

    await rentalRepository.save(rental);

    const rentals = await rentalRepository.list();

    expect(rentals).toHaveLength(1);
  });

  it('should not be able to rent an unregistered car', async () => {
    await expect(async () => {
      await createRentalService.execute({
        carId: 'unregistered',
        userId,
        expectedReturnDate: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an rent with an unregistered user', async () => {
    await expect(async () => {
      await createRentalService.execute({
        carId,
        userId: 'unregistered',
        expectedReturnDate: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to rent an already rented car', async () => {
    const user = new User({
      name: 'Another User',
      email: 'another@user.com',
      driverLicence: '456ABC',
      password: 'password',
    });
    await userRepository.save(user);

    await expect(async () => {
      await createRentalService.execute({
        carId,
        userId: user.id,
        expectedReturnDate: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to rent an car while user already has an opened rent', async () => {
    const car = new Car({
      name: 'other-car',
      brand: 'some-brand',
      categoryId: 'category-id',
      dailyRate: 100,
      description: 'car-description',
      fineAmount: 50,
      licencePlate: '456-ABCD',
    });
    await carRepository.save(car);

    await expect(async () => {
      await createRentalService.execute({
        carId: car.id,
        userId,
        expectedReturnDate: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
