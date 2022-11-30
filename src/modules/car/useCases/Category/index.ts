import { CategoryRepository } from "../../repositories/implementations/CategoryRepository";
import { CreateCategoryController } from "./createCategory/CreateCategoryController";
import { CreateCategoryService } from "./createCategory/CreateCategoryService";
import { ImportCategoriesController } from "./importCategories/ImportCategoriesController";
import { ImportCategoriesService } from "./importCategories/ImportCategoriesService";
import { ListCategoriesController } from "./listCategories/ListCategoriesController";
import { ListCategoriesService } from "./listCategories/ListCategoriesService";

const categoryRepository = CategoryRepository.getInstance();

// Create category

const createCategoryService = new CreateCategoryService(categoryRepository);

const createCategoryController = new CreateCategoryController(
  createCategoryService
);

export { createCategoryController };

// Import category

const importCategoriesService = new ImportCategoriesService(categoryRepository);
const importCategoriesController = new ImportCategoriesController(
  importCategoriesService
);

export { importCategoriesController };

// List categories

const listCategoriesService = new ListCategoriesService(categoryRepository);

const listCategoriesController = new ListCategoriesController(
  listCategoriesService
);

export { listCategoriesController };
