import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import { IUserRepository } from '../../../repositories/IUserRepository';

interface ICreateSession {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

@injectable()
class CreateSessionService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute({ email, password }: ICreateSession): Promise<IResponse> {
    if (!email || !password) {
      throw new AppError('Preencha todos os campos!');
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new AppError('Email e/ou senha incorreta1!');

    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) throw new AppError('Email e/ou senha incorreta2!');

    const token = sign({}, 'abc', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user: {
        name: user.name,
        email: user.email,
      },
      token,
    };
  }
}

export { CreateSessionService };
