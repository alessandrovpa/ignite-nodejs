import Car from '@car/models/Car';

import { ICarRepository, IListCategoryFilters } from '../ICarRepository';

class InMemoryCarRepository implements ICarRepository {
  private cars: Car[];
  constructor() {
    this.cars = [];
  }
  async listAvailablesCars({
    name,
    brand,
    categoryId,
  }: IListCategoryFilters): Promise<Car[]> {
    let cars: Car[] = [];
    cars = this.cars.filter((car) => car.available === true);
    if (name) cars = cars.filter((car) => car.name === name);
    if (brand) cars = cars.filter((car) => car.brand === brand);
    if (categoryId) cars = cars.filter((car) => car.categoryId === categoryId);

    return cars;
  }

  async save(car: Car): Promise<void> {
    const findCar = this.cars.findIndex(
      (loopCar) => loopCar.licencePlate === car.licencePlate
    );
    if (findCar > -1) this.cars.splice(findCar, 1);
    this.cars.push(car);
  }

  async list(): Promise<Car[]> {
    return this.cars;
  }

  async findById(id: string): Promise<Car | null> {
    const car = this.cars.find((car) => car.id === id);
    if (!car) return null;
    return car;
  }

  async findByLicencePlate(licencePlate: string): Promise<Car> {
    const car = this.cars.find((car) => car.licencePlate === licencePlate);
    if (!car) return null;
    return car;
  }
}

export { InMemoryCarRepository };
