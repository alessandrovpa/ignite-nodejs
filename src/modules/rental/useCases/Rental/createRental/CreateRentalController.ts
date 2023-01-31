import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateRentalService } from './CreateRentalService';

class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { car_id, user_id, expected_return_date } = req.body;

    const createRentalService = container.resolve(CreateRentalService);

    const rental = await createRentalService.execute({
      carId: car_id,
      userId: user_id,
      expectedReturnDate: expected_return_date,
    });

    return res.status(201).json(rental);
  }
}

export { CreateRentalController };
