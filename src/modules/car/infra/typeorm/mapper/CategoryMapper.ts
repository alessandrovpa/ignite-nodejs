import LocalCategory from '@car/models/Category';
import { appDataSource } from '@database/index';

import Category from '../entities/Category';

class CategoryMapper {
  static toTypeORM(category: LocalCategory): Category {
    const specificationRepository = appDataSource.getRepository(Category);
    return specificationRepository.create({
      id: category.id,
      name: category.name,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    });
  }

  static toModel(category: Category): LocalCategory {
    return new LocalCategory({
      id: category.id,
      name: category.name,
      description: category.description,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt,
    });
  }
}

export { CategoryMapper };
