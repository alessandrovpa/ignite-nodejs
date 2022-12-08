import { Request, Response } from "express";

import { ListSpecificationService } from "./ListSpecificationsService";

class ListSpecificationController {
  constructor(private listSpecificationService: ListSpecificationService) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const specifications = await this.listSpecificationService.execute();
    return res.status(200).json(specifications);
  }
}

export { ListSpecificationController };
