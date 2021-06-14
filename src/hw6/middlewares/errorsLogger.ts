import { NextFunction, Request, Response } from 'express';
import { winstonLogger } from '../logs/config';

export const errorsLogger = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err){
    winstonLogger.error('Error has happened! Details: ', err);
    res.status(500).json({ error: err.toString() });
    next(err);
    return;
  }
  next();
}