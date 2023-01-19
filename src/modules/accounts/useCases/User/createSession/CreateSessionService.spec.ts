import AppError from '@errors/AppError';

import { InMemoryUserRepository } from '../../../repositories/inMemory/UserRepository';
import { IUserRepository } from '../../../repositories/IUserRepository';
import { CreateUserService } from '../createUser/CreateUserService';
import { CreateSessionService } from './CreateSessionService';

let createSessionService: CreateSessionService;
let createUserService: CreateUserService;
let userRepository: IUserRepository;

const userFields = {
  name: 'UserName',
  email: 'user@email.com',
  password: '1234',
  driverLicense: '4321',
};

describe('Create session service', () => {
  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    createSessionService = new CreateSessionService(userRepository);
    createUserService = new CreateUserService(userRepository);
  });

  it('should be possible to create a new session', async () => {
    await createUserService.execute({
      name: userFields.name,
      email: userFields.email,
      password: userFields.password,
      driverLicence: userFields.driverLicense,
    });

    const response = await createSessionService.execute({
      email: userFields.email,
      password: userFields.password,
    });

    expect(response).toHaveProperty('token');
  });

  it('should not be possible to create a new session with an unregistred email', async () => {
    await expect(async () => {
      await createSessionService.execute({
        email: userFields.email,
        password: userFields.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be possible to create a new session with an incorrect password', async () => {
    await createUserService.execute({
      name: userFields.name,
      email: userFields.email,
      password: userFields.password,
      driverLicence: userFields.driverLicense,
    });

    await expect(async () => {
      await createSessionService.execute({
        email: userFields.email,
        password: 'incorrect-password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('should not be possible to create a new session withou send name and/or email', async () => {
    await expect(async () => {
      await createSessionService.execute({
        email: '',
        password: '',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
