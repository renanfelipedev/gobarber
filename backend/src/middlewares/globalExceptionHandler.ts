import { Request, Response, NextFunction } from 'express';

import AppError from '../errors/AppError';

export default function (
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', error: err.message });
  }

  console.error(err);

  return response
    .status(500)
    .json({ status: 'error', error: 'Internal server error.' });
}
