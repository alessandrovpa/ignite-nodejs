import AppError from '@shared/errors/AppError';
import { Request, Response } from 'express';
import fs from 'fs';
import { container } from 'tsyringe';

import { UpdateAvatarService } from './UpdateAvatarService';

class UpdateAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const file = req.file ? req.file : 0;
    const id = req.user && req.user.id ? req.user.id : 0;

    if (!file) {
      throw new AppError('Envie todos os campos!');
    }

    if (!id) {
      fs.promises.unlink(file.path);
      throw new AppError('Envie todos os campos!');
    }

    const updateAvatarService = container.resolve(UpdateAvatarService);
    const updatedUser = await updateAvatarService.execute({ userId: id, file });

    return res.json(updatedUser);
  }
}

export { UpdateAvatarController };
