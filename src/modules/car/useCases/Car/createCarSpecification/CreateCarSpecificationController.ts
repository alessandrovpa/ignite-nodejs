import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationService } from './CreateCarSpecificationService';

class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const createCarSpecificationService = container.resolve(
      CreateCarSpecificationService
    );

    const carId = req.params.id;
    const specificationsId = req.body.specifications_id;

    const car = await createCarSpecificationService.execute({
      carId,
      specificationsId,
    });

    return res.status(201).json(car);
  }
}

export { CreateCarSpecificationController };
