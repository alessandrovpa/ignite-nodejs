import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoriesService } from './ImportCategoriesService';

class ImportCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { file } = req;
    const importCategoriesService = container.resolve(ImportCategoriesService);
    const result = await importCategoriesService.execute(file);
    return res.json(result);
  }
}

export { ImportCategoriesController };
