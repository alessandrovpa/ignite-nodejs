import LocalCar from '@car/models/Car';
import { appDataSource } from '@database/index';

import Car from '../entities/Car';

class CarMapper {
  static toTypeORM(car: LocalCar): Car {
    const carRepository = appDataSource.getRepository(Car);
    return carRepository.create({
      id: car.id,
      name: car.name,
      description: car.description,
      dailyRate: car.dailyRate,
      available: car.available,
      licencePlate: car.licencePlate,
      fineAmount: car.fineAmount,
      brand: car.brand,
      categoryId: car.categoryId,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt,
    });
  }

  static toModel(car: Car): LocalCar {
    return new LocalCar({
      id: car.id,
      name: car.name,
      description: car.description,
      dailyRate: car.dailyRate,
      available: car.available,
      licencePlate: car.licencePlate,
      fineAmount: car.fineAmount,
      brand: car.brand,
      categoryId: car.categoryId,
      createdAt: car.createdAt,
      updatedAt: car.updatedAt,
    });
  }
}

export { CarMapper };
