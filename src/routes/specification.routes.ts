import { Router } from 'express';

import { CreateSpecificationController } from '../modules/car/useCases/Specification/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '../modules/car/useCases/Specification/listSpecifications/ListSpecificationsController';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();
specificationRoutes.post('/', createSpecificationController.handle);

const listSpecificationController = new ListSpecificationController();
specificationRoutes.get('/', listSpecificationController.handle);

export { specificationRoutes };
