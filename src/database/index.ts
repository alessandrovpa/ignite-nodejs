import User from '@accounts/infra/typeorm/entities/User';
import Category from '@car/infra/typeorm/entities/Category';
import Specification from '@car/infra/typeorm/entities/Specification';
import { DataSource } from 'typeorm';

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
