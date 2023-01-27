import Car from '@car/infra/typeorm/entities/Car';
import { ICarRepository } from '@car/repositories/ICarRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

@injectable()
class FindCarService {
  constructor(@inject('CarRepository') private carRepository: ICarRepository) {}
  async execute(id: string): Promise<Car> {
    const car = await this.carRepository.findById(id);

    if (!car) throw new AppError('Carro não cadastrado!');

    return car;
  }
}

export { FindCarService };
