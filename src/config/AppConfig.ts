class AppConfig {
    appName: string;
    hostname: string;
    port: number;

    constructor(
        appName: string = process.env.APP_NAME || "express-server",
        hostname: string = process.env.HOSTNAME || "localhost",
        port: number = Number(process.env.PORT) || 3000
    ) {
        this.appName = appName;
        this.hostname = hostname;
        this.port = port;
    }
}

export default AppConfig;
