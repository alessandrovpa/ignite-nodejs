import Specification from '@car/models/Specification';
import { ISpecificationRepository } from 'modules/car/repositories/ISpecificationRepository';

import AppError from '@shared/errors/AppError';

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
    const specification = new Specification({
      name,
      description,
    });

    await specificationRepository.save(specification);

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
