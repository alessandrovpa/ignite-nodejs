import { DataSource } from 'typeorm';

import User from '../modules/accounts/infra/typeorm/entities/User';
import Car from '../modules/car/infra/typeorm/entities/Car';
import Category from '../modules/car/infra/typeorm/entities/Category';
import Specification from '../modules/car/infra/typeorm/entities/Specification';

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'ignite',
  entities: [Category, Specification, User, Car],
  migrations: ['./src/database/migrations/*.ts'],
});

appDataSource
  .initialize()
  .then(() => {
    console.log('Databases started!');
  })
  .catch((err) => {
    console.log('Database error:', err);
  });

export { appDataSource };
