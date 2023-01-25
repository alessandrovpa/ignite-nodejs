import User from '../models/User';

interface IUserRepository {
  save(user: User): Promise<void>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByDriverLicence(driverLicence: string): Promise<User>;
}

export { IUserRepository };
