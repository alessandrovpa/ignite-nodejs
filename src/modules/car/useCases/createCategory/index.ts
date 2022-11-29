import { CategoryRepository } from "../../repositories/CategoryRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryService } from "./CreateCategoryService";

const categoryRepository = new CategoryRepository();

const createCategoryService = new CreateCategoryService(categoryRepository);

const createCategoryController = new CreateCategoryController(
  createCategoryService
);

export { createCategoryController };
