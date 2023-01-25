import { UserRepository } from '@accounts/infra/typeorm/repositories/UserRepository';
import { NextFunction, Request, Response } from 'express';

import AppError from '@shared/errors/AppError';

export async function ensureAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.user;

  const userRepository = new UserRepository();
  const user = await userRepository.findById(id);

  if (!user.isAdmin) throw new AppError('Permissão negada!');

  next();
}
