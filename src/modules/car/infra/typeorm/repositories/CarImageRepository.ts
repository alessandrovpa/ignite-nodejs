import CarImage from '@car/models/CarImage';
import { ICarImageRepository } from '@car/repositories/ICarImageRepository';
import { appDataSource } from '@database/index';
import { Repository } from 'typeorm';

import TypeOrmCarImage from '../entities/CarImage';
import { CarImageMapper } from '../mapper/CarImageMapper';

class CarImageRepository implements ICarImageRepository {
  private repository: Repository<TypeOrmCarImage>;
  constructor() {
    this.repository = appDataSource.getRepository(TypeOrmCarImage);
  }
  async saveMany(carImage: CarImage[]): Promise<void> {
    const typeOrmCarImage: TypeOrmCarImage[] = [];
    carImage.forEach((localCarImage) =>
      typeOrmCarImage.push(CarImageMapper.toTypeOrm(localCarImage))
    );

    await this.repository.save(typeOrmCarImage);
  }
}

export { CarImageRepository };
