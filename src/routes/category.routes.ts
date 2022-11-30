import { Router } from "express";
import multer from "multer";

import {
  createCategoryController,
  importCategoriesController,
  listCategoriesController,
} from "../modules/car/useCases/Category";

const categoryRoutes = Router();

const uploadFile = multer({
  dest: "tmp",
});

categoryRoutes.post("/", (req, res) => {
  return createCategoryController.handle(req, res);
});

categoryRoutes.get("/", (req, res) => {
  return listCategoriesController.handle(req, res);
});

categoryRoutes.post("/import", uploadFile.single("file"), (req, res) => {
  return importCategoriesController.handle(req, res);
});

export { categoryRoutes };
