import Car from '@car/models/Car';
import { ICarRepository } from '@car/repositories/ICarRepository';
import { ISpecificationRepository } from '@car/repositories/ISpecificationRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
  carId: string;
  specificationsId: string[];
}

@injectable()
class CreateCarSpecificationService {
  constructor(
    @inject('CarRepository') private carRepository: ICarRepository,
    @inject('SpecificationRepository')
    private specificationRepository: ISpecificationRepository
  ) {}

  async execute({ carId, specificationsId }: IRequest): Promise<Car> {
    const car = await this.carRepository.findById(carId);
    if (!car) throw new AppError('Carro não cadastrado!');

    const specifications = await this.specificationRepository.findByIds(
      specificationsId
    );

    car.specifications = specifications;

    await this.carRepository.save(car);

    return car;
  }
}

export { CreateCarSpecificationService };
