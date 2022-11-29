import { Router } from "express";

import categoryRoutes from "./category.routes";

const routes = Router();

routes.use("/category", categoryRoutes);

export default routes;
