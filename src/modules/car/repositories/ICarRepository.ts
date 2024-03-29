import Car from '@car/models/Car';

interface IListCategoryFilters {
  name?: string;
  brand?: string;
  categoryId?: string;
}

interface ICarRepository {
  save(car: Car): Promise<void>;
  list(): Promise<Car[]>;
  findById(id: string): Promise<Car | null>;
  findByLicencePlate(licencePlate: string): Promise<Car | null>;
  listAvailablesCars(filters: IListCategoryFilters): Promise<Car[]>;
}

export { ICarRepository, IListCategoryFilters };
