import winston, { Logform, format as fmt, transport } from "winston";

class LoggerConfig {
    level: string;
    format: Logform.Format;
    transports: transport[];

    constructor(
        level: string = "info",
        format: Logform.Format = fmt.combine(
            fmt.colorize({ all: true }),
            fmt.timestamp({
                format: "DD-MM-YYYY HH:mm:ss"
            }),
            fmt.align(),
            fmt.printf(
                (log) => `${log.timestamp} [${log.level}] ${log.message}`
            )
        ),
        transports: transport[] = [new winston.transports.Console()]
    ) {
        this.level = level;
        this.format = format;
        this.transports = transports;
    }
}

export default LoggerConfig;
