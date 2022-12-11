import { Router } from "express";

import { categoryRoutes } from "./category.routes";
import { specificationRoutes } from "./specification.routes";
import { userRoutes } from "./user.routes";

const routes = Router();

routes.use("/category", categoryRoutes);
routes.use("/specification", specificationRoutes);
routes.use("/user", userRoutes);

export { routes };
