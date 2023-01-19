import Category from '../../models/Category';
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from '../ICategoryRepository';

class InMemoryCategoryRepository implements ICategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category = new Category();
    Object.assign(category, {
      name,
      description,
    });

    return category;
  }
  async save(category: Category): Promise<Category> {
    this.categories.push(category);
    return category;
  }

  async saveMany(categories: Category[]): Promise<Category[]> {
    categories.forEach((category) => {
      this.categories.push(category);
    });

    return categories;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = this.categories.find((category) => category.name === name);
    return category;
  }
}

export { InMemoryCategoryRepository };
