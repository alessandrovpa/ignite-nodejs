import { Router } from "express";

import { createCategoryController } from "../modules/car/useCases/createCategory";
import { listCategoriesController } from "../modules/car/useCases/listCategories";

const categoryRoutes = Router();

categoryRoutes.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

categoryRoutes.get("/", (req, res) => {
  return listCategoriesController.handle(req, res);
});

export { categoryRoutes };
