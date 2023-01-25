import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarService } from './CreateCarService';

class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      description,
      dailyRate,
      licencePlate,
      fineAmount,
      brand,
      categoryId,
    } = req.body;
    const createCarService = container.resolve(CreateCarService);

    const car = await createCarService.execute({
      name,
      description,
      dailyRate,
      licencePlate,
      fineAmount,
      brand,
      categoryId,
    });

    return res.status(201).json(car);
  }
}

export { CreateCarController };
