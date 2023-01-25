import { hashSync } from 'bcrypt';
import { randomUUID } from 'crypto';

import User from '../../modules/accounts/infra/typeorm/entities/User';
import { appDataSource } from '../index';

async function create() {
  await appDataSource.initialize();
  const userRepository = appDataSource.getRepository(User);

  const user = userRepository.create({
    id: randomUUID(),
    name: 'admin',
    email: 'admin@admin.com',
    password: hashSync('123456', 8),
    driverLicence: '123',
    isAdmin: true,
  });

  await userRepository.save(user);
}

create()
  .catch((err) => console.log(err))
  .then(() => {
    console.log('User admin created!');
  });
