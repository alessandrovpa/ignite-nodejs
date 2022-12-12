import { inject, injectable } from "tsyringe";

import AppError from "../../../../../errors/AppError";
import Category from "../../../models/Category";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";

interface ICreateCategoryService {
  name: string;
  description: string;
}

@injectable()
class CreateCategoryService {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  public async execute({
    name,
    description,
  }: ICreateCategoryService): Promise<Category> {
    if (!name || !description) {
      throw new AppError("Preencha todos os campos!");
    }

    const existCategory = await this.categoryRepository.findByName(name);
    if (existCategory) {
      throw new AppError("Categoria já cadastrada!");
    }

    const category = this.categoryRepository.create({
      name,
      description,
    });
    await this.categoryRepository.save(category);

    return category;
  }
}

export { CreateCategoryService };
