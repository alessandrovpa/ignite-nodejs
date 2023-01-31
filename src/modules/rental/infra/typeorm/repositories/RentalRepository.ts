import { appDataSource } from '@database/index';
import Rental from '@rental/models/Rental';
import { IRentalRepository } from '@rental/repositories/IRentalRepository';
import { Repository } from 'typeorm';

import TypeOrmRental from '../entities/Rental';
import { RentalMapper } from '../mapper/RentalMapper';

class RentalRepository implements IRentalRepository {
  private repository: Repository<TypeOrmRental>;

  constructor() {
    this.repository = appDataSource.getRepository(TypeOrmRental);
  }

  async save(rental: Rental): Promise<void> {
    await this.repository.save(RentalMapper.toTypeOrm(rental));
  }

  async list(): Promise<Rental[]> {
    const rentals: Rental[] = [];
    const typeOrmRentals = await this.repository.find();

    typeOrmRentals.forEach((rental) =>
      rentals.push(RentalMapper.toModel(rental))
    );

    return rentals;
  }

  async findById(id: string): Promise<Rental> {
    const rental = await this.repository.findOne({
      where: { id },
      relations: {
        user: true,
        car: true,
      },
    });

    if (!rental) return null;

    return RentalMapper.toModel(rental);
  }

  async findOpenRentalByCarId(carId: string): Promise<Rental | null> {
    const rental = await this.repository.findOne({
      where: {
        carId,
        endDate: null,
      },
    });
    if (!rental) return null;
    return RentalMapper.toModel(rental);
  }
  async findOpenRentalByUserId(userId: string): Promise<Rental | null> {
    const rental = await this.repository.findOne({
      where: {
        userId,
        endDate: null,
      },
    });
    if (!rental) return null;
    return RentalMapper.toModel(rental);
  }
}

export { RentalRepository };
