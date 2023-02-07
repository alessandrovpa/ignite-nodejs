import { hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';
import { DataSource, Repository } from 'typeorm';

import User from '../../modules/accounts/infra/typeorm/entities/User';
import { appDataSource } from '../index';

dotenv.config();

async function createAdmin(dataSource?: DataSource): Promise<void> {
  let userRepository: Repository<User>;

  if (process.env.NODE_ENV !== 'test') {
    await appDataSource.initialize();
  }

  if (dataSource) {
    userRepository = dataSource.getRepository(User);
  } else {
    userRepository = appDataSource.getRepository(User);
  }

  const user = userRepository.create({
    id: randomUUID(),
    name: 'admin',
    email: 'admin@admin.com',
    password: hashSync('123456', 8),
    driverLicence: '123',
    isAdmin: true,
  });

  await userRepository.save(user);

  if (process.env.NODE_ENV !== 'test') {
    await appDataSource.destroy();
  }
}

export { createAdmin };
