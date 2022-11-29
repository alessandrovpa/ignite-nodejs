import { Request, Response } from "express";

import { ListSpecificationService } from "./ListSpecificationsService";

class ListSpecificationController {
  constructor(private listSpecificationService: ListSpecificationService) {}

  handle(req: Request, res: Response): Response {
    const specifications = this.listSpecificationService.execute();
    return res.status(200).json(specifications);
  }
}

export { ListSpecificationController };
