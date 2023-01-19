import AppError from '@errors/AppError';
import { ISpecificationRepository } from 'modules/car/repositories/ISpecificationRepository';

import { InMemorySpecificationRepository } from '../../../repositories/inMemory/SpecificationRepository';
import { CreateSpecificationService } from './CreateSpecificationService';

let createSpecificationService: CreateSpecificationService;
let specificationRepository: ISpecificationRepository;

describe('Create specification service', () => {
  const name = 'specification';
  const description = 'description';

  beforeAll(() => {
    specificationRepository = new InMemorySpecificationRepository();
    createSpecificationService = new CreateSpecificationService(
      specificationRepository
    );
  });

  it('should be able to create a new specification', async () => {
    const specification = await createSpecificationService.execute({
      name,
      description,
    });

    expect(specification).toHaveProperty('id');
  });

  it('should not be able to create an already registered specification', () => {
    expect(async () => {
      await createSpecificationService.execute({
        name,
        description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a specification without an name', () => {
    expect(async () => {
      await createSpecificationService.execute({
        name: '',
        description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a specification without an description', () => {
    expect(async () => {
      await createSpecificationService.execute({
        name,
        description: '',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
