import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserService } from "./CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, username, email, password, driverLicence } = req.body;
    const createUserService = container.resolve(CreateUserService);
    try {
      const user = await createUserService.execute({
        name,
        username,
        email,
        password,
        driverLicence,
      });
      return res.status(201).json(user);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateUserController };
