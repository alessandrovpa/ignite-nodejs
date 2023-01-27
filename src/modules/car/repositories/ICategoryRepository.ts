import Category from '../models/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoryRepository {
  save(category: Category): Promise<void>;
  saveMany(categories: Category[]): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category | null>;
}

export { ICategoryRepository, ICreateCategoryDTO };
