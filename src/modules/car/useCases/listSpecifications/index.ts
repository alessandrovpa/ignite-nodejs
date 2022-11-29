import { SpecificationRepository } from "../../repositories/SpecificationRepository";
import { ListSpecificationController } from "./ListSpecificationsController";
import { ListSpecificationService } from "./ListSpecificationsService";

const specificationRepository = new SpecificationRepository();

const listSpecificationService = new ListSpecificationService(
  specificationRepository
);

const listSpecificationController = new ListSpecificationController(
  listSpecificationService
);

export { listSpecificationController };
