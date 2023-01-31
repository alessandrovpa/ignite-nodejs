import { CreateRentalController } from '@rental/useCases/Rental/createRental/CreateRentalController';
import { Router } from 'express';
import { ensureAdmin } from 'middlewares/ensureAdmin';
import { ensureAuthenticated } from 'middlewares/ensureAuthenticated';

const rentalRoutes = Router();

rentalRoutes.use(ensureAuthenticated);
rentalRoutes.use(ensureAdmin);

const createRentalController = new CreateRentalController();
rentalRoutes.post('/', createRentalController.handle);

export { rentalRoutes };
