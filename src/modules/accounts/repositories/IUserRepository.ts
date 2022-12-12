import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import User from "../models/User";

interface IUserRepository {
  create(newUser: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User>;
  findByDriverLicence(driverLicence: string): Promise<User>;
}

export { IUserRepository };
