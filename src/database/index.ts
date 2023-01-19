import { DataSource } from 'typeorm';

import User from '../modules/accounts/models/User';
import Category from '../modules/car/models/Category';
import Specification from '../modules/car/models/Specification';

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database: 'ignite',
  entities: [Category, Specification, User],
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
