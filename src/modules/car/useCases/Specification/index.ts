import { SpecificationRepository } from "../../repositories/implementations/SpecificationRepository";
import { CreateSpecificationController } from "./createSpecification/CreateSpecificationController";
import { CreateSpecificationService } from "./createSpecification/CreateSpecificationService";
import { ListSpecificationController } from "./listSpecifications/ListSpecificationsController";
import { ListSpecificationService } from "./listSpecifications/ListSpecificationsService";

const specificationRepository = new SpecificationRepository();

// Create specification

const createSpecificationService = new CreateSpecificationService(
  specificationRepository
);
const createSpecificationController = new CreateSpecificationController(
  createSpecificationService
);

export { createSpecificationController };

// List specifications

const listSpecificationService = new ListSpecificationService(
  specificationRepository
);

const listSpecificationController = new ListSpecificationController(
  listSpecificationService
);

export { listSpecificationController };
