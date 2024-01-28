import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import AppError from '../errors/AppError';

import { routes } from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

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
