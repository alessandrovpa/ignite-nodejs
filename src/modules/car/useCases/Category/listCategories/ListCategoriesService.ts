import Category from '@car/models/Category';
import { ICategoryRepository } from '@car/repositories/ICategoryRepository';
import { inject, injectable } from 'tsyringe';

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
