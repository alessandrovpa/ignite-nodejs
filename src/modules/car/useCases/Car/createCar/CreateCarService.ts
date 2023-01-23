import { Car } from '@car/models/Car';
import { ICarRepository } from '@car/repositories/ICarRepository';
import { inject, injectable } from 'tsyringe';

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
