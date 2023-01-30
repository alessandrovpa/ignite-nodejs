import { CreateCarController } from '@car/useCases/Car/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@car/useCases/Car/createCarSpecification/CreateCarSpecificationController';
import { ListCarController } from '@car/useCases/Car/listAvailableCar/ListCarController';
import { UploadCarImagecontroller } from '@car/useCases/Car/uploadImageCar/UploadCarImageController';
import uploadConfig from '@config/upload';
import { Router } from 'express';
import { ensureAdmin } from 'middlewares/ensureAdmin';
import { ensureAuthenticated } from 'middlewares/ensureAuthenticated';
import multer from 'multer';

const carRoutes = Router();

const listCarController = new ListCarController();
carRoutes.get('/', listCarController.handle);

carRoutes.use(ensureAuthenticated);
carRoutes.use(ensureAdmin);

const createCarController = new CreateCarController();
carRoutes.post('/', createCarController.handle);

const createCarSpecificationController = new CreateCarSpecificationController();
carRoutes.post('/:id/specification', createCarSpecificationController.handle);

const uploadImages = multer(uploadConfig.upload('./tmp/car'));
const uploadCarImageController = new UploadCarImagecontroller();
carRoutes.post(
  '/:id/image',
  uploadImages.array('image'),
  uploadCarImageController.handle
);

export { carRoutes };
