import Category from "../../../models/Category";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";

interface ICreateCategoryService {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  public async execute({
    name,
    description,
  }: ICreateCategoryService): Promise<Category> {
    if (!name || !description) {
      throw new Error("Preencha todos os campos!");
    }

    const existCategory = await this.categoryRepository.findByName(name);
    if (existCategory) {
      throw new Error("Categoria já cadastrada!");
    }

    const category = await this.categoryRepository.create({
      name,
      description,
    });

    return category;
  }
}

export { CreateCategoryService };
