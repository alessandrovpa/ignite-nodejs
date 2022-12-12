import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryService } from "./CreateCategoryService";

class CreateCategoryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createCategoryService = container.resolve(CreateCategoryService);

    const category = await createCategoryService.execute({
      name,
      description,
    });

    return res.status(201).json(category);
  }
}

export { CreateCategoryController };
