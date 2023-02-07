import dotenv from 'dotenv';
import { DataSource } from 'typeorm';

import User from '../modules/accounts/infra/typeorm/entities/User';
import Car from '../modules/car/infra/typeorm/entities/Car';
import CarImage from '../modules/car/infra/typeorm/entities/CarImage';
import Category from '../modules/car/infra/typeorm/entities/Category';
import Specification from '../modules/car/infra/typeorm/entities/Specification';
import Rental from '../modules/rental/infra/typeorm/entities/Rental';

dotenv.config();

const database = process.env.NODE_ENV === 'test' ? 'ignite_test' : 'ignite';

const appDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'docker',
  database,
  entities: [Category, Specification, User, Car, CarImage, Rental],
  migrations: ['./src/database/migrations/*.ts'],
  // logging: true,
});

export { appDataSource };
