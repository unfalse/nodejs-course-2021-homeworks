import { winstonLogger } from "./config";

process.on('unhandledRejection', (error: any) => {
    // Will print "unhandledRejection err is not defined"
    winstonLogger.error('Unhandled promise rejection! Details: ', error.message);
});

process.on('uncaughtException', (error: any) => {
    winstonLogger.error(`Uncaught exception! Details: `, error);
})