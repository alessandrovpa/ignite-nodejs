import Category from "../models/Category";
import CategoryRepository from "../repositories/CategoryRepository";

interface ICreateCategoryService {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  public execute({ name, description }: ICreateCategoryService): Category {
    const verifyNameAlreadyExist = this.categoryRepository.findByName(name);
    if (verifyNameAlreadyExist) {
      throw new Error("Categoria já cadastrada!");
    }

    const category = this.categoryRepository.create({ name, description });

    return category;
  }
}

export default CreateCategoryService;
