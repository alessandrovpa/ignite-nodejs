import { CreateCarController } from '@car/useCases/Car/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@car/useCases/Car/createCarSpecification/CreateCarSpecificationController';
import { ListCarController } from '@car/useCases/Car/listAvailableCar/ListCarController';
import { Router } from 'express';
import { ensureAdmin } from 'middlewares/ensureAdmin';
import { ensureAuthenticated } from 'middlewares/ensureAuthenticated';

const carRoutes = Router();

const listCarController = new ListCarController();
carRoutes.get('/', listCarController.handle);

carRoutes.use(ensureAuthenticated);
carRoutes.use(ensureAdmin);

const createCarController = new CreateCarController();
carRoutes.post('/', createCarController.handle);

const createCarSpecificationController = new CreateCarSpecificationController();
carRoutes.post('/:id/specifications', createCarSpecificationController.handle);

export { carRoutes };
