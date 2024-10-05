import express, { Express } from "express";
import { Server } from "http";
import { Logger as WinstonLogger } from "winston";
import { AppConfig } from "./config";
import Logger from "./Logger";
import router from "./routers";
import { errorHandler } from "./handlers";

class App {
    private static _instance: App;
    private _logger: WinstonLogger;
    private _app: Express;
    private _config: AppConfig;

    private constructor(config: AppConfig) {
        this._app = express();
        this._config = config;
        this._logger = Logger.instance().logger;
    }

    static instance(config: AppConfig = new AppConfig()): App {
        if (!this._instance) {
            this._instance = new App(config);
        }

        return this._instance;
    }

    start(): Server {
        // parse request body as json
        this._app.use(express.json());

        this._app.use("/api", router);

        // error middleware
        this._app.use(errorHandler);

        return this._app.listen(this._config.port, () => {
            this._logger.info(
                `${this._config.appName} listening on ${this._config.hostname}:${this._config.port}`
            );
        });
    }
}

export default App;
