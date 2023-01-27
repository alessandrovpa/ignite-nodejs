import Category from '@car/models/Category';
import { ICategoryRepository } from '@car/repositories/ICategoryRepository';
import { appDataSource } from '@database/index';
import { Repository } from 'typeorm';

import TypeOrmCategory from '../entities/Category';
import { CategoryMapper } from '../mapper/CategoryMapper';

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<TypeOrmCategory>;

  constructor() {
    this.repository = appDataSource.getRepository(TypeOrmCategory);
  }

  async save(category: Category): Promise<void> {
    await this.repository.save(CategoryMapper.toTypeORM(category));
  }

  async saveMany(categories: Category[]): Promise<void> {
    const typeOrmCategories: TypeOrmCategory[] = [];
    categories.forEach((category) =>
      typeOrmCategories.push(CategoryMapper.toTypeORM(category))
    );
    await this.repository.save(typeOrmCategories);
  }

  async list(): Promise<Category[]> {
    const categories: Category[] = [];

    const typeOrmCategories = await this.repository.find();

    typeOrmCategories.forEach((category) =>
      categories.push(CategoryMapper.toModel(category))
    );

    return categories;
  }

  async findByName(name: string): Promise<Category | null> {
    const category = await this.repository
      .createQueryBuilder()
      .where('LOWER(name) = LOWER(:name)', { name })
      .getOne();

    if (!category) return null;

    return CategoryMapper.toModel(category);
  }
}

export { CategoryRepository };
