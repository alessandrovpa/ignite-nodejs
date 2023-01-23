import { IUserRepository } from 'modules/accounts/repositories/IUserRepository';

import AppError from '@shared/errors/AppError';

import { InMemoryUserRepository } from '../../../repositories/inMemory/UserRepository';
import { CreateUserService } from './CreateUserService';

let createUserService: CreateUserService;
let userRepository: IUserRepository;

const userProps = {
  name: 'user-name',
  email: 'user@email.com',
  password: 'pass',
  driverLicence: '1234',
};

describe('Create user service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    createUserService = new CreateUserService(userRepository);
  });

  it('sould be able to create a new user', async () => {
    const user = await createUserService.execute({
      name: userProps.name,
      email: userProps.email,
      password: userProps.password,
      driverLicence: userProps.driverLicence,
    });

    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('createdAt');
  });

  it('sould not be able to create a new user sending empty fields', async () => {
    await expect(async () => {
      await createUserService.execute({
        name: '',
        email: '',
        password: '',
        driverLicence: '',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('sould not be able to create a new user with already used email', async () => {
    const user = await createUserService.execute({
      name: userProps.name,
      email: userProps.email,
      password: userProps.password,
      driverLicence: userProps.driverLicence,
    });

    expect(user).toHaveProperty('id');

    await expect(async () => {
      await createUserService.execute({
        name: userProps.name,
        email: userProps.email,
        password: userProps.password,
        driverLicence: `${userProps.driverLicence}2`,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('sould not be able to create a new user with already used driver licence', async () => {
    const user = await createUserService.execute({
      name: userProps.name,
      email: userProps.email,
      password: userProps.password,
      driverLicence: userProps.driverLicence,
    });

    expect(user).toHaveProperty('id');

    await expect(async () => {
      await createUserService.execute({
        name: userProps.name,
        email: `second${userProps.email}`,
        password: userProps.password,
        driverLicence: userProps.driverLicence,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
