import { Router } from "express";

import SpecificationRepository from "../modules/car/repositories/SpecificationRepository";
import CreateSpecificationService from "../modules/car/services/CreateSpecificationService";

const routes = Router();
const specificationRepository = new SpecificationRepository();

routes.post("/", (req, res) => {
  const { name, description } = req.body;

  const createSpecification = new CreateSpecificationService(
    specificationRepository
  );
  try {
    const specification = createSpecification.execute({ name, description });
    return res.json(specification);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

routes.get("/", (req, res) => {
  const specifications = specificationRepository.list();
  return res.json(specifications);
});

export default routes;
