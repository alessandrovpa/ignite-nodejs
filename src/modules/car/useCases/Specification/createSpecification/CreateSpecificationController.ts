import { Request, Response } from "express";

import { CreateSpecificationService } from "./CreateSpecificationService";

class CreateSpecificationController {
  constructor(private createSpecificationService: CreateSpecificationService) {}
  async handle(req: Request, res: Response): Promise<Response> {
    const { name, description } = req.body;

    try {
      const specification = await this.createSpecificationService.execute({
        name,
        description,
      });
      return res.status(201).json(specification);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

export { CreateSpecificationController };
