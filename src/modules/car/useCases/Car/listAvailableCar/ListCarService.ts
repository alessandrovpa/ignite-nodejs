import Car from '@car/models/Car';
import {
  ICarRepository,
  IListCategoryFilters,
} from '@car/repositories/ICarRepository';
import { inject, injectable } from 'tsyringe';

@injectable()
class ListCarService {
  constructor(@inject('CarRepository') private carRepository: ICarRepository) {}

  async execute(filter: IListCategoryFilters): Promise<Car[]> {
    const cars = await this.carRepository.listAvailablesCars(filter);
    return cars;
  }
}

export { ListCarService };
