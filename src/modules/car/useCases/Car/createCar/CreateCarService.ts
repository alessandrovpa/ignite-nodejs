import Car from '@car/models/Car';
import { ICarRepository } from '@car/repositories/ICarRepository';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface ICreateCar {
  name: string;
  description: string;
  dailyRate: number;
  licencePlate: string;
  fineAmount: number;
  brand: string;
  categoryId: string;
}

@injectable()
class CreateCarService {
  constructor(@inject('CarRepository') private carRepository: ICarRepository) {}

  async execute({
    name,
    description,
    dailyRate,
    licencePlate,
    fineAmount,
    brand,
    categoryId,
  }: ICreateCar): Promise<Car> {
    const verifyLicencePlate = await this.carRepository.findByLicencePlate(
      licencePlate
    );
    if (verifyLicencePlate)
      throw new AppError('Já existe um veículo com esta placa');

    const car = new Car({
      name,
      description,
      dailyRate,
      licencePlate,
      fineAmount,
      brand,
      categoryId,
    });
    await this.carRepository.save(car);
    return car;
  }
}

export { CreateCarService };
