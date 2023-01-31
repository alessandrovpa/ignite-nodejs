import { UserMapper } from '@accounts/infra/typeorm/mappers/UserMapper';
import { CarMapper } from '@car/infra/typeorm/mapper/CarMapper';
import { appDataSource } from '@database/index';
import LocalRental from '@rental/models/Rental';

import Rental from '../entities/Rental';

class RentalMapper {
  static toTypeOrm(rental: LocalRental): Rental {
    const rentalRepository = appDataSource.getRepository(Rental);

    return rentalRepository.create({
      id: rental.id,
      carId: rental.carId,
      userId: rental.userId,
      startDate: rental.startDate,
      endDate: rental.endDate,
      expectedReturnDate: rental.expectedReturnDate,
      createdAt: rental.createdAt,
      updatedAt: rental.updatedAt,
    });
  }

  static toModel(rental: Rental): LocalRental {
    const localRental = new LocalRental({
      id: rental.id,
      carId: rental.carId,
      userId: rental.userId,
      startDate: rental.startDate,
      endDate: rental.endDate,
      expectedReturnDate: rental.expectedReturnDate,
      createdAt: rental.createdAt,
      updatedAt: rental.updatedAt,
    });

    if (rental.user) {
      localRental.user = UserMapper.toModel(rental.user);
    }

    if (rental.car) {
      localRental.car = CarMapper.toModel(rental.car);
    }

    return localRental;
  }
}

export { RentalMapper };
