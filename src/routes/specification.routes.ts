import { Router } from 'express';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '../modules/car/useCases/Specification/createSpecification/CreateSpecificationController';
import { ListSpecificationController } from '../modules/car/useCases/Specification/listSpecifications/ListSpecificationsController';

const specificationRoutes = Router();

const listSpecificationController = new ListSpecificationController();
specificationRoutes.get('/', listSpecificationController.handle);

specificationRoutes.use(ensureAuthenticated);
specificationRoutes.use(ensureAdmin);

const createSpecificationController = new CreateSpecificationController();
specificationRoutes.post('/', createSpecificationController.handle);

export { specificationRoutes };
