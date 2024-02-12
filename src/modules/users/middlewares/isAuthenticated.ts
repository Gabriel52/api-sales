import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing', 401);
  }
  const [, token] = authHeader.split(' ');
  try {
    const decodeToken = verify(token, authConfig.jwt.secret);
    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token', 401);
  }
}

export { isAuthenticated };
