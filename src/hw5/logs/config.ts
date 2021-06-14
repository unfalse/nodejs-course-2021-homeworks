import {createLogger, transports, format} from 'winston';

const loggerFormat = format.printf(({ level, message, timestamp}) =>
  `${timestamp} [${level}] : ${message}`
);

export const winstonLogger = createLogger({
  transports: [
    new transports.Console({
      level: 'error',
      format: format.combine(
        format.colorize(),
        format.splat(),
        format.timestamp({ format:'MMM DD YYYY HH:mm:ss.SSS Z' }),
        loggerFormat
      ),
      // handleExceptions: true
    })
  ]
});