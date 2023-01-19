import AppError from '@errors/AppError';
import fs from 'fs';
import { inject, injectable } from 'tsyringe';

import User from '../../../models/User';
import { IUserRepository } from '../../../repositories/IUserRepository';

interface IUpdateAvatar {
  userId: string;
  file: Express.Multer.File;
}

const MIMETYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'];

@injectable()
class UpdateAvatarService {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository
  ) {}

  async execute({ userId, file }: IUpdateAvatar): Promise<User> {
    if (!file) {
      throw new AppError('Envie todos os campos!');
    }

    if (!userId) {
      fs.promises.unlink(file.path);
      throw new AppError('Envie todos os campos!');
    }

    const user = await this.userRepository.findById(userId);
    if (!user) throw new AppError('Usuário inválido!');

    if (!MIMETYPES.includes(file.mimetype)) {
      fs.promises.unlink(file.path);
      throw new AppError('Formato não aceito!');
    }

    fs.promises.unlink(`${file.destination}/${user.avatar}`);

    const { filename } = file;
    user.avatar = filename;
    await this.userRepository.save(user);

    return user;
  }
}

export { UpdateAvatarService };
