import User from '@accounts/models/User';

import { IUserRepository } from '../IUserRepository';

class InMemoryUserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
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
