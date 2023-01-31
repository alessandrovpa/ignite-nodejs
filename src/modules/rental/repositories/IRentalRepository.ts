import Rental from '../models/Rental';

interface IRentalRepository {
  save(rental: Rental): Promise<void>;
  list(): Promise<Rental[]>;
  findById(id: string): Promise<Rental | null>;
  findOpenRentalByCarId(carId: string): Promise<Rental | null>;
  findOpenRentalByUserId(userId: string): Promise<Rental | null>;
}

export { IRentalRepository };
