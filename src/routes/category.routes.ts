import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '../config/upload';
import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateCategoryController } from '../modules/car/useCases/Category/createCategory/CreateCategoryController';
import { ImportCategoriesController } from '../modules/car/useCases/Category/importCategories/ImportCategoriesController';
import { ListCategoriesController } from '../modules/car/useCases/Category/listCategories/ListCategoriesController';

const categoryRoutes = Router();

const uploadFile = multer(uploadConfig.upload('tmp'));

const listCategoriesController = new ListCategoriesController();
categoryRoutes.get('/', listCategoriesController.handle);

categoryRoutes.use(ensureAuthenticated);
categoryRoutes.use(ensureAdmin);

const createCategoryController = new CreateCategoryController();
categoryRoutes.post('/', createCategoryController.handle);

const importCategoriesController = new ImportCategoriesController();
categoryRoutes.post(
  '/import',
  uploadFile.single('file'),
  importCategoriesController.handle
);

export { categoryRoutes };
