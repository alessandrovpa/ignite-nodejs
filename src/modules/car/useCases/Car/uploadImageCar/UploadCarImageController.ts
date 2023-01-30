import { Request, Response } from 'express';
import fs from 'node:fs';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { UploadCarImageService } from './UploadCarImageService';

class UploadCarImagecontroller {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const images = req.files as Express.Multer.File[];

    if (images.length === 0) throw new AppError('Envie todos os campos!');

    if (!id) {
      images.forEach((image) => {
        fs.promises.unlink(image.path);
      });
      throw new AppError('Envie todos os campos!');
    }

    const uploadCarImageService = container.resolve(UploadCarImageService);

    const response = await uploadCarImageService.execute({ carId: id, images });

    return res.status(201).json(response);
  }
}

export { UploadCarImagecontroller };
