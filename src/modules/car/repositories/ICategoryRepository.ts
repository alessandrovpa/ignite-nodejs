import Category from '../models/Category';

interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoryRepository {
  create({ name, description }: ICreateCategoryDTO): Category;
  save(category: Category): Promise<Category>;
  saveMany(categories: Category[]): Promise<Category[]>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category>;
}

export { ICategoryRepository, ICreateCategoryDTO };
