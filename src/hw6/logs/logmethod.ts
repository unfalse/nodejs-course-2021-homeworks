import { winstonLogger } from "./config";

export const logMethod = (methodName: string, args: string, error: Error) => {
    winstonLogger.error(`Method ${methodName}`);
    winstonLogger.error(`Arguments: ${args}`);
    winstonLogger.error(`Error: ${error}`);
}