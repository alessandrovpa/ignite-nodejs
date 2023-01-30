import LocalCarImage from '@car/models/CarImage';
import { appDataSource } from '@database/index';

import CarImage from '../entities/CarImage';

class CarImageMapper {
  static toTypeOrm(carImage: LocalCarImage): CarImage {
    const carImageRepository = appDataSource.getRepository(CarImage);

    return carImageRepository.create({
      id: carImage.id,
      carId: carImage.carId,
      image: carImage.image,
      createdAt: carImage.createdAt,
    });
  }

  static toModel(carImage: CarImage): LocalCarImage {
    return new LocalCarImage({
      id: carImage.id,
      carId: carImage.carId,
      image: carImage.image,
      createdAt: carImage.createdAt,
    });
  }
}

export { CarImageMapper };
