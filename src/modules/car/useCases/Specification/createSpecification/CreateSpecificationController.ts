import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateSpecificationService } from "./CreateSpecificationService";

class CreateSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    const createSpecificationService = container.resolve(
      CreateSpecificationService
    );

    const specification = await createSpecificationService.execute({
      name,
      description,
    });

    return res.status(201).json(specification);
  }
}

export { CreateSpecificationController };
