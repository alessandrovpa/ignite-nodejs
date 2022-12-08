import { Request, Response } from "express";

import { ListCategoriesService } from "./ListCategoriesService";

class ListCategoriesController {
  constructor(private listCategoriesService: ListCategoriesService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const categories = await this.listCategoriesService.execute();
    return res.status(200).json(categories);
  }
}

export { ListCategoriesController };
