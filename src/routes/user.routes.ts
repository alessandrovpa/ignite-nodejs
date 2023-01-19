import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateUserController } from '../modules/accounts/useCases/User/createUser/CreateUserController';
import { UpdateAvatarController } from '../modules/accounts/useCases/User/updateAvatar/UpdateAvatarController';

const uploadAvatar = multer(uploadConfig.upload('./tmp/avatar'));

const userRoutes = Router();

const createUserController = new CreateUserController();
userRoutes.post('/', createUserController.handle);

userRoutes.use(ensureAuthenticated);

const updateAvatarController = new UpdateAvatarController();
userRoutes.patch(
  '/avatar',
  uploadAvatar.single('avatar'),
  updateAvatarController.handle
);

export { userRoutes };
