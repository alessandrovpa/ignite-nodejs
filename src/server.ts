import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import AppError from '@shared/errors/AppError';

import './shared/container';

import { routes } from './routes/routes';
import swaggerConfig from './swagger.json';

const app = express();

app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }
  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

export { app };
