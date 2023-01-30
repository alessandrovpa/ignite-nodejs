import CarImage from '@car/models/CarImage';

interface ICarImageRepository {
  saveMany(carImage: CarImage[]): Promise<void>;
}

export { ICarImageRepository };
