import Category from "../../models/Category";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";

interface ICreateCategoryService {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoryRepository: ICategoryRepository) {}

  public execute({ name, description }: ICreateCategoryService): Category {
    if (!name || !description) {
      throw new Error("Preencha todos os campos!");
    }

    const verifyNameAlreadyExist = this.categoryRepository.findByName(name);
    if (verifyNameAlreadyExist) {
      throw new Error("Categoria já cadastrada!");
    }

    const category = this.categoryRepository.create({ name, description });

    return category;
  }
}

export { CreateCategoryService };
