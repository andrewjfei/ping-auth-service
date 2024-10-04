import winston, { Logger } from "winston";

const { combine, timestamp, printf, colorize, align } = winston.format;

const logger: Logger = winston.createLogger({
    level: "info",
    format: combine(
        colorize({ all: true }),
        timestamp({
            format: "DD-MM-YYYY HH:mm:ss"
        }),
        align(),
        printf((log) => `${log.timestamp} [${log.level}] ${log.message}`)
    ),
    transports: [new winston.transports.Console()]
});

export default logger;
