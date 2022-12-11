import { Router } from "express";
import multer from "multer";

import { CreateCategoryController } from "../modules/car/useCases/Category/createCategory/CreateCategoryController";
import { ImportCategoriesController } from "../modules/car/useCases/Category/importCategories/ImportCategoriesController";
import { ListCategoriesController } from "../modules/car/useCases/Category/listCategories/ListCategoriesController";

const categoryRoutes = Router();

const uploadFile = multer({
  dest: "tmp",
});

const createCategoryController = new CreateCategoryController();
categoryRoutes.post("/", createCategoryController.handle);

const listCategoriesController = new ListCategoriesController();
categoryRoutes.get("/", listCategoriesController.handle);

const importCategoriesController = new ImportCategoriesController();
categoryRoutes.post(
  "/import",
  uploadFile.single("file"),
  importCategoriesController.handle
);

export { categoryRoutes };
