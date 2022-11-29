import { CategoryRepository } from "../../repositories/CategoryRepository";
import { ListCategoriesController } from "./ListCategoriesController";
import { ListCategoriesService } from "./ListCategoriesService";

const categoryRepository = new CategoryRepository();

const listCategoriesService = new ListCategoriesService(categoryRepository);

const listCategoriesController = new ListCategoriesController(
  listCategoriesService
);

export { listCategoriesController };
