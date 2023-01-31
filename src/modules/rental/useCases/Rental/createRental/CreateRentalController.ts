import { Request, Response } from 'express';

class CreateRentalController {
  async handle(req: Request, res: Response): Promise<Response> {
    return res.status(201).json({ ok: true });
  }
}

export { CreateRentalController };
