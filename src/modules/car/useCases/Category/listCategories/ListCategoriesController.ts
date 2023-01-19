import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoriesService } from './ListCategoriesService';

class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoriesService = container.resolve(ListCategoriesService);
    const categories = await listCategoriesService.execute();
    return res.status(200).json(categories);
  }
}

export { ListCategoriesController };
