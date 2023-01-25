import Car from '@car/models/Car';
import { ICarRepository } from '@car/repositories/ICarRepository';
import { InMemoryCarRepository } from '@car/repositories/inMemory/CarRepository';

import { ListCarService } from './ListCarService';

let listCarService: ListCarService;
let carRepository: ICarRepository;

describe('List Car Service', () => {
  const name = 'car';
  const description = 'description';
  const dailyRate = 100;
  const fineAmount = 50;
  const brand = 'brand';
  const categoryId = 'category-id';
  beforeAll(() => {
    carRepository = new InMemoryCarRepository();
    listCarService = new ListCarService(carRepository);
  });

  it('should be able to list all availables cars', async () => {
    const car = new Car({
      name,
      description,
      dailyRate,
      licencePlate: '123-ABC',
      fineAmount,
      brand,
      categoryId,
    });
    await carRepository.save(car);
    const rentedCar = new Car({
      name: 'car2',
      description,
      dailyRate,
      licencePlate: '456-ABC',
      fineAmount,
      brand: 'brand2',
      categoryId: 'category_id2',
    });
    rentedCar.rentCar();
    await carRepository.save(rentedCar);

    const cars = await listCarService.execute({});

    expect(cars).toHaveLength(1);
  });

  it('should be able to list all availables cars by name', async () => {
    const car = new Car({
      name,
      description,
      dailyRate,
      licencePlate: '321-ABC',
      fineAmount,
      brand: 'brand3',
      categoryId: 'category_id3',
    });
    await carRepository.save(car);
    const rentedCar = await carRepository.findByLicencePlate('456-ABC');

    rentedCar.unrentCar();
    carRepository.save(rentedCar);

    let cars = await listCarService.execute({ name });
    expect(cars).toHaveLength(2);

    cars = await listCarService.execute({ name: 'unregistred' });
    expect(cars).toHaveLength(0);
  });

  it('should be able to list all availables cars by brand', async () => {
    let cars = await listCarService.execute({ brand });
    expect(cars).toHaveLength(1);

    cars = await listCarService.execute({ brand: 'unregistred' });
    expect(cars).toHaveLength(0);
  });

  it('should be able to list all availables cars by category id', async () => {
    let cars = await listCarService.execute({ categoryId });
    expect(cars).toHaveLength(1);

    cars = await listCarService.execute({ categoryId: 'unregistred' });
    expect(cars).toHaveLength(0);
  });
});
