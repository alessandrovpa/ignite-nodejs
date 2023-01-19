import { Router } from 'express';

import { CreateSessionController } from '../modules/accounts/useCases/User/createSession/CreateSessionController';

const sessionRoutes = Router();

const createSessionController = new CreateSessionController();
sessionRoutes.post('/', createSessionController.handle);

export { sessionRoutes };
