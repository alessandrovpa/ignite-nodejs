import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import AppError from "../../../../../errors/AppError";
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
      throw new AppError("Preencha todos os campos!");
    }

    const verifyEmailAlreadyExist = await this.userRepository.findByEmail(
      email
    );
    if (verifyEmailAlreadyExist) throw new AppError("Email já cadastrado!");

    const verifyDriverLicenceAlreadyExist =
      await this.userRepository.findByDriverLicence(driverLicence);
    if (verifyDriverLicenceAlreadyExist)
      throw new AppError("Licença de motorista já cadastrada!");

    const hashedPassword = await hash(password, 8);

    const user = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      driverLicence,
    });

    await this.userRepository.save(user);

    return user;
  }
}

export { CreateUserService };
