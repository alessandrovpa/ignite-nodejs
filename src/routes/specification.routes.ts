import { Router } from "express";

import { createSpecificationController } from "../modules/car/useCases/createSpecification";
import { listSpecificationController } from "../modules/car/useCases/listSpecifications";

const specificationRoutes = Router();

specificationRoutes.post("/", (req, res) => {
  return createSpecificationController.handle(req, res);
});

specificationRoutes.get("/", (req, res) => {
  return listSpecificationController.handle(req, res);
});

export { specificationRoutes };
