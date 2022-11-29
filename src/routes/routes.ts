import { Router } from "express";

import { categoryRoutes } from "./category.routes";
import { specificationRoutes } from "./specification.routes";

const routes = Router();

routes.use("/category", categoryRoutes);
routes.use("/specification", specificationRoutes);

export { routes };
