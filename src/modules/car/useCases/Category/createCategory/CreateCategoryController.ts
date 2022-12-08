import { Request, Response } from "express";

import { CreateCategoryService } from "./CreateCategoryService";

class CreateCategoryController {
  constructor(private createCategoryService: CreateCategoryService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    try {
      const category = await this.createCategoryService.execute({
        name,
        description,
      });
      return res.status(201).json(category);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateCategoryController };
