import { inject, injectable } from "tsyringe";

import { ICreateUserDTO } from "../../../dtos/ICreateUserDTO";
import User from "../../../models/User";
import { IUserRepository } from "../../../repositories/IUserRepository";

@injectable()
class CreateUserService {
  constructor(
    @inject("UserRepository") private userRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    driverLicence,
  }: ICreateUserDTO): Promise<User> {
    if (!name || !email || !password || !driverLicence) {
      throw new Error("Preencha todos os campos!");
    }

    const verifyEmailAlreadyExist = await this.userRepository.findByEmail(
      email
    );
    if (verifyEmailAlreadyExist) throw new Error("Email já cadastrado!");

    const verifyDriverLicenceAlreadyExist =
      await this.userRepository.findByDriverLicence(driverLicence);
    if (verifyDriverLicenceAlreadyExist)
      throw new Error("Licença de motorista já cadastrada!");

    const user = await this.userRepository.create({
      name,
      email,
      password,
      driverLicence,
    });

    return user;
  }
}

export { CreateUserService };
