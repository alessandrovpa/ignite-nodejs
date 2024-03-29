import LocalCar from '@car/models/Car';
import LocalSpecification from '@car/models/Specification';
import { appDataSource } from '@database/index';

import Car from '../entities/Car';
import Specification from '../entities/Specification';
import { CategoryMapper } from './CategoryMapper';
import { SpecificationMapper } from './SpecificationMapper';

class CarMapper {
  static toTypeORM(car: LocalCar): Car {
    const typeOrmSpecifications: Specification[] = [];
    const carRepository = appDataSource.getRepository(Car);

    const typeOrmCar = carRepository.create({
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

    if (car.specifications) {
      car.specifications.map((specification) =>
        typeOrmSpecifications.push(SpecificationMapper.toTypeORM(specification))
      );
      typeOrmCar.specifications = typeOrmSpecifications;
    }

    return typeOrmCar;
  }

  static toModel(car: Car): LocalCar {
    const specifications: LocalSpecification[] = [];

    const localCar = new LocalCar({
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

    if (car.category) {
      localCar.category = CategoryMapper.toModel(car.category);
    }
    if (car.specifications) {
      car.specifications.map((specification) =>
        specifications.push(SpecificationMapper.toModel(specification))
      );
      localCar.specifications = specifications;
    }

    return localCar;
  }
}

export { CarMapper };
