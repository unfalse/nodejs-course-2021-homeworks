import { winstonLogger } from "../lib/config";

export const executionTime = (req, res, next) => {
    const startHrTime = process.hrtime();

    res.on("finish", () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
        winstonLogger.info(`Method ${req.method} (${req.url}) has executed in ${elapsedTimeInMs} ms`);
    });

    next();
}