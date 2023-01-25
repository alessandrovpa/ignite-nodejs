import User from '@accounts/models/User';
import { IUserRepository } from '@accounts/repositories/IUserRepository';
import { appDataSource } from '@database/index';
import { Repository } from 'typeorm';

import TypeOrmUser from '../entities/User';
import { UserMapper } from '../mappers/UserMapper';

class UserRepository implements IUserRepository {
  private userRepository: Repository<TypeOrmUser>;

  constructor() {
    this.userRepository = appDataSource.getRepository(TypeOrmUser);
  }

  async save(user: User): Promise<void> {
    await this.userRepository.save(UserMapper.toTypeORM(user));
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    return UserMapper.toModel(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return UserMapper.toModel(user);
  }

  async findByDriverLicence(driverLicence: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { driverLicence },
    });
    return UserMapper.toModel(user);
  }
}

export { UserRepository };
