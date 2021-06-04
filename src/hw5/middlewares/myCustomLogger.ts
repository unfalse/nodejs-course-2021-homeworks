import { NextFunction, Request, Response } from 'express';

export const myCustomLogger = (req: Request, _res: Response, next: NextFunction) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request url: ${req.url}`);
  next();
}
