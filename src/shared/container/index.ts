import { UserRepository } from '@accounts/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@accounts/repositories/IUserRepository';
import { CarImageRepository } from '@car/infra/typeorm/repositories/CarImageRepository';
import { CarRepository } from '@car/infra/typeorm/repositories/CarRepository';
import { CategoryRepository } from '@car/infra/typeorm/repositories/CategoryRepository';
import { SpecificationRepository } from '@car/infra/typeorm/repositories/SpecificationRepository';
import { ICarImageRepository } from '@car/repositories/ICarImageRepository';
import { ICarRepository } from '@car/repositories/ICarRepository';
import { ICategoryRepository } from '@car/repositories/ICategoryRepository';
import { ISpecificationRepository } from '@car/repositories/ISpecificationRepository';
import { container } from 'tsyringe';

container.registerSingleton<ICategoryRepository>(
  'CategoryRepository',
  CategoryRepository
);

container.registerSingleton<ISpecificationRepository>(
  'SpecificationRepository',
  SpecificationRepository
);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<ICarRepository>('CarRepository', CarRepository);

container.registerSingleton<ICarImageRepository>(
  'CarImageRepository',
  CarImageRepository
);
