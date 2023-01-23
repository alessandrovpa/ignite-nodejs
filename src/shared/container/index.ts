import { UserRepository } from '@accounts/infra/typeorm/repositories/UserRepository';
import { IUserRepository } from '@accounts/repositories/IUserRepository';
import { CategoryRepository } from '@car/infra/typeorm/repositories/CategoryRepository';
import { SpecificationRepository } from '@car/infra/typeorm/repositories/SpecificationRepository';
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
