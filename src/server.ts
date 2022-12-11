import "reflect-metadata";
import express from "express";
import swaggerUi from "swagger-ui-express";

import "./shared/container";
import { routes } from "./routes/routes";
import swaggerConfig from "./swagger.json";

const app = express();

app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use(routes);

app.listen(3333, () => {
  console.log("Server started!");
});
