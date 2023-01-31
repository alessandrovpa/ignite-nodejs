import { IUserRepository } from '@accounts/repositories/IUserRepository';
import { ICarRepository } from '@car/repositories/ICarRepository';
import Rental from '@rental/models/Rental';
import { IRentalRepository } from '@rental/repositories/IRentalRepository';
import { inject, injectable } from 'tsyringe';

import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import AppError from '@shared/errors/AppError';

interface IRequest {
  carId: string;
  userId: string;
  expectedReturnDate: Date;
}

@injectable()
class CreateRentalService {
  constructor(
    @inject('RentalRepository') private rentalRepository: IRentalRepository,
    @inject('CarRepository') private carRepository: ICarRepository,
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('DateProvider') private dateProvider: IDateProvider
  ) {}
  async execute({
    carId,
    userId,
    expectedReturnDate,
  }: IRequest): Promise<Rental> {
    const compareDifferenceInHours =
      this.dateProvider.compareDateInHours(expectedReturnDate);

    if (compareDifferenceInHours < 24)
      throw new AppError(
        'Você não pode alugar um carro com menos de 24 horas de duração!'
      );

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

    await this.rentalRepository.save(rental);

    return rental;
  }
}

export { CreateRentalService };
