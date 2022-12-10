import { Repository } from "typeorm";

import { appDataSource } from "../../../../database";
import Category from "../../models/Category";
import {
  ICategoryRepository,
  ICreateCategoryDTO,
} from "../ICategoryRepository";

class CategoryRepository implements ICategoryRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = appDataSource.getRepository(Category);
  }

  create({ name, description }: ICreateCategoryDTO): Category {
    const category = this.repository.create({
      name,
      description,
    });

    return category;
  }

  async save(category: Category): Promise<Category> {
    await this.repository.save(category);
    return category;
  }

  async saveMany(categories: Category[]): Promise<Category[]> {
    await this.repository.save(categories);
    return categories;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository
      .createQueryBuilder()
      .where("LOWER(name) = LOWER(:name)", { name })
      .getOne();

    return category;
  }
}

export { CategoryRepository };
