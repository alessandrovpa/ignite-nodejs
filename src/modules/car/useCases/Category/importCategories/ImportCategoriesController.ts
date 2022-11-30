import { Request, Response } from "express";

import { ImportCategoriesService } from "./ImportCategoriesService";

class ImportCategoriesController {
  constructor(private importCategoriesService: ImportCategoriesService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;
    const result = await this.importCategoriesService.execute(file);
    return res.json(result);
  }
}

export { ImportCategoriesController };
