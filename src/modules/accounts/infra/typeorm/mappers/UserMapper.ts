import LocalUser from '@accounts/models/User';
import { appDataSource } from '@database/index';

import User from '../entities/User';

class UserMapper {
  static toTypeORM(user: LocalUser): User {
    const userRepository = appDataSource.getRepository(User);
    return userRepository.create({
      name: user.name,
      avatar: user.avatar,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      driverLicence: user.driverLicense,
      email: user.email,
      password: user.password,
      id: user.id,
      isAdmin: Boolean(user.isAdmin),
    });
  }

  static toModel(user: User): LocalUser {
    return new LocalUser({
      name: user.name,
      avatar: user.avatar,
      createdAt: user.createdAt,
      driverLicence: user.driverLicence,
      password: user.password,
      email: user.email,
      id: user.id,
      isAdmin: Boolean(user.isAdmin),
    });
  }
}

export { UserMapper };
