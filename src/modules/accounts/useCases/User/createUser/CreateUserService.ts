import User from '@accounts/models/User';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IUserRepository } from '../../../repositories/IUserRepository';

interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
  driverLicence: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driverLicence,
  }: ICreateUserDTO): Promise<User> {
    if (!name || !email || !password || !driverLicence) {
      throw new AppError('Preencha todos os campos!');
    }

    const verifyEmailAlreadyExist = await this.userRepository.findByEmail(
      email
    );
    if (verifyEmailAlreadyExist) throw new AppError('Email já cadastrado!');

    const verifyDriverLicenceAlreadyExist =
      await this.userRepository.findByDriverLicence(driverLicence);
    if (verifyDriverLicenceAlreadyExist)
      throw new AppError('Licença de motorista já cadastrada!');

    const user = new User({
      name,
      email,
      password,
      driverLicence,
    });

    await this.userRepository.save(user);

    return user;
  }
}

export { CreateUserService };
