import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { container } from "tsyringe";

import AppError from "../errors/AppError";
import { IUserRepository } from "../modules/accounts/repositories/IUserRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new AppError("Permissão negada!", 401);

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userId } = verify(token, "abc") as IPayload;
    const userRepository = container.resolve<IUserRepository>("UserRepository");
    const verifyUser = await userRepository.findById(userId);
    if (!verifyUser) throw new AppError("Usuário não encontrado!");
    Object.assign(req, {
      user: {
        id: userId,
      },
    });
  } catch (error) {
    throw new AppError(`Permissão negada!`, 401);
  }

  next();
}
