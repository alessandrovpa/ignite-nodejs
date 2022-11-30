import { Router } from "express";

import {
  createSpecificationController,
  listSpecificationController,
} from "../modules/car/useCases/Specification";

const specificationRoutes = Router();

specificationRoutes.post("/", (req, res) => {
  return createSpecificationController.handle(req, res);
});

specificationRoutes.get("/", (req, res) => {
  return listSpecificationController.handle(req, res);
});

export { specificationRoutes };
