import { DataSource } from "typeorm";

import Category from "../modules/car/models/Category";

const appDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "ignite",
  entities: [Category],
  migrations: ["./src/database/migrations/*.ts"],
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Databases started!");
  })
  .catch((err) => {
    console.log("Database error:", err);
  });

export { appDataSource };
