import { Car } from '@car/models/Car';

import { ICarRepository } from '../ICarRepository';

class InMemoryCarRepository implements ICarRepository {
  private cars: Car[];
  constructor() {
    this.cars = [];
  }

  async save(car: Car): Promise<void> {
    this.cars.push(car);
  }

  async list(): Promise<Car[]> {
    return this.cars;
  }
}

export { InMemoryCarRepository };
