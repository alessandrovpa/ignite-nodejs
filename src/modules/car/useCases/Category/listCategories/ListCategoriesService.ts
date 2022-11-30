import Category from "../../../models/Category";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";

class ListCategoriesService {
  constructor(private categoryRepository: ICategoryRepository) {}
  execute(): Category[] {
    const categories = this.categoryRepository.list();
    return categories;
  }
}

export { ListCategoriesService };
