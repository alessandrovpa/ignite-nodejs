import { IUserRepository } from '@accounts/repositories/IUserRepository';
import { ICarRepository } from '@car/repositories/ICarRepository';
import Rental from '@rental/models/Rental';
import { IRentalRepository } from '@rental/repositories/IRentalRepository';

import AppError from '@shared/errors/AppError';

interface IRequest {
  carId: string;
  userId: string;
  expectedReturnDate: Date;
}

class CreateRentalService {
  constructor(
    private rentalRepository: IRentalRepository,
    private carRepository: ICarRepository,
    private userRepository: IUserRepository
  ) {}
  async execute({
    carId,
    userId,
    expectedReturnDate,
  }: IRequest): Promise<Rental> {
    const verifyUserExist = await this.userRepository.findById(userId);
    if (!verifyUserExist) throw new AppError('Usuário não cadastrado!');

    const verifyCarExist = await this.carRepository.findById(carId);
    if (!verifyCarExist) throw new AppError('Veículo não cadastrado!');

    const verifyCarAvailable =
      await this.rentalRepository.findOpenRentalByCarId(carId);
    if (verifyCarAvailable) throw new AppError('Este veículo já está alugado!');

    const verifyUserAvailable =
      await this.rentalRepository.findOpenRentalByUserId(userId);
    if (verifyUserAvailable)
      throw new AppError('Este usuário já possui um aluguel pendente!');

    const rental = new Rental({
      carId,
      userId,
      expectedReturnDate,
    });

    return rental;
  }
}

export { CreateRentalService };
