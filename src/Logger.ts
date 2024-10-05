import { Logger as WinstonLogger, createLogger } from "winston";

import { LoggerConfig } from "./config";

class Logger {
    private static _instance: Logger;
    private _config: LoggerConfig;

    private constructor(config: LoggerConfig) {
        this._config = config;
    }

    static instance(config: LoggerConfig = new LoggerConfig()): Logger {
        if (!this._instance) {
            this._instance = new Logger(config);
        }

        return this._instance;
    }

    get logger(): WinstonLogger {
        return createLogger({
            level: this._config.level,
            format: this._config.format,
            transports: this._config.transports
        });
    }
}

export default Logger;
