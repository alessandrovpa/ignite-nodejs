import User from '@accounts/models/User';

import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUserRepository } from '../IUserRepository';

class InMemoryUserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  create({ name, email, password, driverLicence }: ICreateUserDTO): User {
    const user = new User({ name, email, password, driverLicence });
    return user;
  }

  async save(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find((user) => user.id === id);
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find((user) => user.email === email);
    return user;
  }

  async findByDriverLicence(driverLicence: string): Promise<User> {
    const user = this.users.find(
      (user) => user.driverLicense === driverLicence
    );
    return user;
  }
}

export { InMemoryUserRepository };
