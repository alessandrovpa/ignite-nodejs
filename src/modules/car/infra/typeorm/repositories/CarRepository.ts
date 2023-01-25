import Car from '@car/models/Car';
import {
  ICarRepository,
  IListCategoryFilters,
} from '@car/repositories/ICarRepository';
import { appDataSource } from '@database/index';
import { Repository } from 'typeorm';

import TypeOrmCar from '../entities/Car';
import { CarMapper } from '../mapper/CarMapper';

class CarRepository implements ICarRepository {
  private carRepository: Repository<TypeOrmCar>;

  constructor() {
    this.carRepository = appDataSource.getRepository(TypeOrmCar);
  }

  async save(car: Car): Promise<void> {
    await this.carRepository.save(CarMapper.toTypeORM(car));
  }

  async list(): Promise<Car[]> {
    const cars: Car[] = [];
    const typeOrmCars = await this.carRepository.find();
    typeOrmCars.forEach((car) => cars.push(CarMapper.toModel(car)));
    return cars;
  }

  async findByLicencePlate(licencePlate: string): Promise<Car | null> {
    const car = await this.carRepository.findOne({
      where: {
        licencePlate,
      },
      relations: {
        category: true,
      },
    });
    if (!car) return null;
    return CarMapper.toModel(car);
  }

  async listAvailablesCars({
    name,
    brand,
    categoryId,
  }: IListCategoryFilters): Promise<Car[]> {
    const cars: Car[] = [];

    const query = this.carRepository
      .createQueryBuilder()
      .where('available = :available', { available: true });

    if (name)
      query.andWhere('LOWER(name) LIKE :name', {
        name: `%${name.toLowerCase()}%`,
      });
    if (brand)
      query.andWhere('LOWER(brand) LIKE :brand', {
        brand: `%${brand.toLowerCase()}%`,
      });
    if (categoryId) query.andWhere('category_id = :categoryId', { categoryId });

    const typeOrmCars = await query.getMany();

    typeOrmCars.forEach((car) => {
      cars.push(CarMapper.toModel(car));
    });

    return cars;
  }
}

export { CarRepository };
