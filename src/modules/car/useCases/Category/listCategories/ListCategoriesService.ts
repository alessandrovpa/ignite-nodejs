import Category from "../../../models/Category";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";

class ListCategoriesService {
  constructor(private categoryRepository: ICategoryRepository) {}
  async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.list();
    return categories;
  }
}

export { ListCategoriesService };
