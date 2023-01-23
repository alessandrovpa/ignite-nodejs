import { ICreateUserDTO } from '@accounts/dtos/ICreateUserDTO';
import { IUserRepository } from '@accounts/repositories/IUserRepository';
import { appDataSource } from '@database/index';
import { Repository } from 'typeorm';

import User from '../entities/User';

class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = appDataSource.getRepository(User);
  }

  create({ name, email, password, driverLicence }: ICreateUserDTO): User {
    const user = this.userRepository.create({
      name,
      email,
      password,
      driverLicence,
    });
    return user;
  }

  async save(user: User): Promise<User> {
    await this.userRepository.save(user);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findByDriverLicence(driverLicence: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { driverLicence },
    });
    return user;
  }
}

export { UserRepository };
