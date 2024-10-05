import { PrismaClient } from "@prisma/client";
import { DatabaseConfig } from "./config";

class Database {
    private static _instance: Database;
    private _config: DatabaseConfig;

    private constructor(config: DatabaseConfig) {
        this._config = config;
    }

    static instance(config: DatabaseConfig = new DatabaseConfig()): Database {
        if (!this._instance) {
            this._instance = new Database(config);
        }

        return this._instance;
    }

    set config(config: DatabaseConfig) {
        this._config = config;
    }

    get client(): PrismaClient {
        return new PrismaClient({
            datasources: {
                db: {
                    url: this._config.url
                }
            }
        });
    }
}

export default Database;
