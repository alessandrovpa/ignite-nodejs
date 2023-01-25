import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCarService } from './ListCarService';

class ListCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCatService = container.resolve(ListCarService);
    const { name, brand } = req.query;
    const categoryId = req.query.category_id;
    const cars = await listCatService.execute({
      name: name as string,
      brand: brand as string,
      categoryId: categoryId as string,
    });

    return res.status(201).json(cars);
  }
}

export { ListCarController };
