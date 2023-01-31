import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarService } from './CreateCarService';

class CreateCarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const {
      name,
      description,
      daily_rate,
      licence_plate,
      fine_amount,
      brand,
      category_id,
    } = req.body;
    const createCarService = container.resolve(CreateCarService);

    const car = await createCarService.execute({
      name,
      description,
      dailyRate: daily_rate,
      licencePlate: licence_plate,
      fineAmount: fine_amount,
      brand,
      categoryId: category_id,
    });

    return res.status(201).json(car);
  }
}

export { CreateCarController };
