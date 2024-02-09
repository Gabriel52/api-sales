import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import AppError from '@shared/errors/AppError';
import '../typeorm';

import { routes } from './routes';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());

// middleware to get and handle with errors
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: Error, req: Request, res: Response, _next: NextFunction) => {
  const globalError = {
    message: 'Internal server error',
    statusCode: 500,
  };
  if (error instanceof AppError) {
    const { message, statusCode } = error;
    return res.status(statusCode).json({
      message,
    });
  }

  return res.status(globalError.statusCode).json({
    message: globalError.message,
  });
});

const PORT = 3333;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server started on port ${PORT}! 🚀`);
});
