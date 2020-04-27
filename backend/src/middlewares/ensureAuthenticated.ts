import { verify } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

import authConfig from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new Error('JWT Token is missing.');
  }

  const [type, token] = authHeader.split(' ');

  if (!token || !type) {
    throw new Error('Malformated token.');
  }

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch (err) {
    throw new Error('Invalid token');
  }
}
