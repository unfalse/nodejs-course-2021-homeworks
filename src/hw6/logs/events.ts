import { winstonLogger } from "./config";

function once(fn, context) { 
    var result;
    return function() { 
        if (fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }
        return result;
    };
}

export const setGlobalHandlers = once(() => {
    process.on('unhandledRejection', (error: any) => {
        winstonLogger.error('Unhandled promise rejection! Details: ', error);
    });

    process.on('uncaughtException', (error: any) => {
        winstonLogger.error(`Uncaught exception! Details: `, error);
        process.exit(1);
    });
}, this);