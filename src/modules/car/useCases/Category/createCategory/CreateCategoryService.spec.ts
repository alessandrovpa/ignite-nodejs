import Category from '@car/models/Category';

import AppError from '@shared/errors/AppError';

import { ICategoryRepository } from '../../../repositories/ICategoryRepository';
import { InMemoryCategoryRepository } from '../../../repositories/inMemory/CategoryRepository';
import { CreateCategoryService } from './CreateCategoryService';

let categoryRepository: ICategoryRepository;
let createCategoryService: CreateCategoryService;

const categoryProps = {
  name: 'category',
  description: 'a new category',
};

describe('Create category service', () => {
  beforeAll(() => {
    categoryRepository = new InMemoryCategoryRepository();
    createCategoryService = new CreateCategoryService(categoryRepository);
  });

  it('should be able to create a new category', async () => {
    const category = new Category({
      name: categoryProps.name,
      description: categoryProps.description,
    });

    await categoryRepository.save(category);

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create a new category with an repeated name', async () => {
    await expect(async () => {
      await createCategoryService.execute({
        name: categoryProps.name,
        description: categoryProps.description,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new category with an empty name or/and description', async () => {
    const name = '';
    const description = '';

    await expect(async () => {
      await createCategoryService.execute({ name, description });
    }).rejects.toBeInstanceOf(AppError);
  });
});
