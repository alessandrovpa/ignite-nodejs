import Category from '@car/models/Category';

import { ICategoryRepository } from '../ICategoryRepository';

class InMemoryCategoryRepository implements ICategoryRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  async save(category: Category): Promise<void> {
    this.categories.push(category);
  }

  async saveMany(categories: Category[]): Promise<void> {
    categories.forEach((category) => {
      this.categories.push(category);
    });
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = this.categories.find((category) => category.name === name);
    if (!category) return null;
    return category;
  }
}

export { InMemoryCategoryRepository };
