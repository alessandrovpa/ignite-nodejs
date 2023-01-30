import CarImage from '@car/models/CarImage';
import { ICarImageRepository } from '@car/repositories/ICarImageRepository';
import { ICarRepository } from '@car/repositories/ICarRepository';
import fs from 'node:fs';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

interface IRequest {
  carId: string;
  images: Express.Multer.File[];
}

interface IResponse {
  createdImages: number;
  imagesWithInvalidMimetypes: number;
  carImages: CarImage[];
}

const MIMETYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];

@injectable()
class UploadCarImageService {
  constructor(
    @inject('CarImageRepository')
    private carImageRepository: ICarImageRepository,
    @inject('CarRepository')
    private carRepository: ICarRepository
  ) {}

  async execute({ carId, images }: IRequest): Promise<IResponse> {
    const carImages: CarImage[] = [];

    const verifyCarExist = await this.carRepository.findById(carId);
    if (!verifyCarExist) {
      images.forEach((image) => {
        fs.promises.unlink(image.path);
      });
      throw new AppError('Carro não cadastrado!');
    }

    images.forEach((image) => {
      if (!MIMETYPES.includes(image.mimetype)) {
        fs.promises.unlink(image.path);
        return;
      }
      carImages.push(new CarImage({ carId, image: image.filename }));
    });

    await this.carImageRepository.saveMany(carImages);

    const createdImages = carImages.length;
    const imagesWithInvalidMimetypes = images.length - createdImages;

    return {
      carImages,
      createdImages,
      imagesWithInvalidMimetypes,
    };
  }
}

export { UploadCarImageService };
