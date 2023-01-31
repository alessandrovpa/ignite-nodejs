import Rental from 'modules/rental/models/Rental';

import { IRentalRepository } from '../IRentalRepository';

class InMemoryRentalRepository implements IRentalRepository {
  private rentals: Rental[];

  constructor() {
    this.rentals = [];
  }

  async save(rental: Rental): Promise<void> {
    this.rentals.push(rental);
  }

  async list(): Promise<Rental[]> {
    return this.rentals;
  }

  async findById(id: string): Promise<Rental> {
    const rental = this.rentals.find((rental) => rental.id === id);
    if (!rental) return null;
    return rental;
  }

  async findOpenRentalByCarId(carId: string): Promise<Rental | null> {
    const rental = this.rentals.find(
      (rental) => rental.carId === carId && rental.endDate === null
    );

    if (!rental) return null;
    return rental;
  }

  async findOpenRentalByUserId(userId: string): Promise<Rental | null> {
    const rental = this.rentals.find(
      (rental) => rental.userId === userId && rental.endDate === null
    );

    if (!rental) return null;
    return rental;
  }
}

export { InMemoryRentalRepository };
