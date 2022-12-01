import { Request, Response } from "express";

import { ListCategoriesService } from "./ListCategoriesService";

class ListCategoriesController {
  constructor(private listCategoriesService: ListCategoriesService) {}
  handle(req: Request, res: Response): Response {
    const categories = this.listCategoriesService.execute();
    return res.status(200).json(categories);
  }
}

export { ListCategoriesController };
