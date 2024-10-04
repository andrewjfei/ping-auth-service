import { PrismaClient } from "@prisma/client";

class DatabaseConfig {
    private static _instance: DatabaseConfig;
    private _dbUrl: string;

    private constructor() {
        this._dbUrl =
            process.env.POSTGRESQL_URL ||
            "postgres://admin:password@localhost:5432/ping";
    }

    static instance(): DatabaseConfig {
        if (!this._instance) {
            this._instance = new DatabaseConfig();
        }

        return this._instance;
    }

    get client(): PrismaClient {
        return new PrismaClient({
            datasources: {
                db: {
                    url: this._dbUrl
                }
            }
        });
    }
    
    // override default database url
    set dbUrl(dbUrl: string) {
        this._dbUrl = dbUrl;
    }
}

export default DatabaseConfig;
