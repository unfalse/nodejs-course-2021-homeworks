import {createLogger, transports} from 'winston';

export const winstonLogger = createLogger({
  transports: [
    new transports.Console()
  ]
});