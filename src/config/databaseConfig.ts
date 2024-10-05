class DatabaseConfig {
    url: string;

    constructor(
        url = process.env.POSTGRESQL_URL ||
            "postgres://admin:password@localhost:5432/db"
    ) {
        this.url = url;
    }
}

export default DatabaseConfig;
