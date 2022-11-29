import { Router } from "express";

import CategoryRepository from "../repositories/CategoryRepository";
import CreateCategoryService from "../services/CreateCategoryService";

const categoryRoutes = Router();

const categoryRepository = new CategoryRepository();

categoryRoutes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createCategory = new CreateCategoryService(categoryRepository);

  try {
    const category = createCategory.execute({ name, description });
    return res.status(201).json(category);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

categoryRoutes.get("/", (req, res) => {
  const categories = categoryRepository.list();

  return res.json(categories);
});

export default categoryRoutes;
