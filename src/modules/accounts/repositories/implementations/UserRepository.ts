import { Repository } from "typeorm";

import { appDataSource } from "../../../../database";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import User from "../../models/User";
import { IUserRepository } from "../IUserRepository";

class UserRepository implements IUserRepository {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = appDataSource.getRepository(User);
  }

  async create({
    name,
    email,
    password,
    driverLicence,
  }: ICreateUserDTO): Promise<User> {
    const user = this.userRepository.create({
      name,
      email,
      password,
      driverLicence,
    });
    await this.userRepository.save(user);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async findByDriverLicence(driverLicence: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { driverLicence },
    });
    return user;
  }
}

export { UserRepository };
