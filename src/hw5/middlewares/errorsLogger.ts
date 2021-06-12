import { NextFunction, Request, Response } from 'express';
import { winstonLogger } from '../config';

export const errorsLogger = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (err){
    winstonLogger.error('Error has happened! Details: ', err);
    return res.status(500).json({ error: err.toString() });
  }
  next();
}