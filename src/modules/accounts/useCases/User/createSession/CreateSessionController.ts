import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateSessionService } from './CreateSessionService';

class CreateSessionController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const createSessionService = container.resolve(CreateSessionService);
    const token = await createSessionService.execute({ email, password });

    return res.json(token);
  }
}

export { CreateSessionController };
