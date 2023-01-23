import { Car } from '@car/models/Car';

interface ICarRepository {
  save(car: Car): Promise<void>;
  list(): Promise<Car[]>;
}

export { ICarRepository };
