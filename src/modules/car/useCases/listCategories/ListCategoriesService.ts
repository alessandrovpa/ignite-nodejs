import Category from "../../models/Category";
import { CategoryRepository } from "../../repositories/CategoryRepository";

class ListCategoriesService {
  constructor(private categoryRepository: CategoryRepository) {}
  execute(): Category[] {
    const categories = this.categoryRepository.list();
    return categories;
  }
}

export { ListCategoriesService };
