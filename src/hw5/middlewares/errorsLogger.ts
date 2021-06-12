import { NextFunction } from 'express';
import {createLogger, transports} from 'winston';

const winstonLogger = createLogger({
  transports: [
    new transports.Console()
  ]
});

export const errorsLogger = (req: Request, _res: Response, next: NextFunction) => {
  winstonLogger.error('test');
}