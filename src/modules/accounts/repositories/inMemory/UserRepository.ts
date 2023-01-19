import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import User from '../../models/User';
import { IUserRepository } from '../IUserRepository';

class InMemoryUserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [];
  }

  create({ name, email, password, driverLicence }: ICreateUserDTO): User {
    const user = new User();
    Object.assign(user, {
      name,
      email,
      password,
      driverLicence,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

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
      (user) => user.driverLicence === driverLicence
    );
    return user;
  }
}

export { InMemoryUserRepository };
