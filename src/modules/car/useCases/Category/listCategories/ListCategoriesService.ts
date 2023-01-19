import { inject, injectable } from 'tsyringe';

import Category from '../../../models/Category';
import { ICategoryRepository } from '../../../repositories/ICategoryRepository';

@injectable()
class ListCategoriesService {
  constructor(
    @inject('CategoryRepository')
    private categoryRepository: ICategoryRepository
  ) {}
  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list();
    return categories;
  }
}

export { ListCategoriesService };
