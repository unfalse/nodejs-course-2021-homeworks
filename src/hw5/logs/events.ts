import { winstonLogger } from "./config";

process.on('unhandledRejection', (error: any) => {
    winstonLogger.error('Unhandled promise rejection! Details: ', error);
});

process.on('uncaughtException', (error: any) => {
    winstonLogger.error(`Uncaught exception! Details: `, error);
})