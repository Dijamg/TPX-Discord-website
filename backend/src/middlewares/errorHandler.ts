import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.message);
  res.status(500).json({ error: 'Internal Server Error' });
} 