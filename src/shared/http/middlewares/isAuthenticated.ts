import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function isAuthenticated(
  request: Request,
  _response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing', 401);
  }
  const [, token] = authHeader.split(' ');
  try {
    const decodedToken = verify(token, authConfig.jwt.secret);
    const { sub } = decodedToken as ITokenPayload;

    request.user = {
      id: sub,
    };
    return next();
  } catch (error) {
    throw new AppError('Invalid JWT Token', 401);
  }
}

export { isAuthenticated };
