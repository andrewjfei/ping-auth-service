//import express, { Express } from "express";
//
//import router from "./routers";
//import { errorHandler } from "./handlers";
//import { LoggerConfig } from "./config";
//
//const app: Express = express();
//const port: number = Number(process.env.PORT) || 3000;
//
//// parse request body as json
//app.use(express.json());
//
//app.use("/api", router);
//
//// error middleware
//app.use(errorHandler);
//
//// only start server if file is entry point of the application (required for intergration testing)
//if (require.main === module) {
//    app.listen(port, () => {
//        LoggerConfig.instance.logger.info(
//            `${process.env.APP_NAME} listening on ${process.env.HOSTNAME}:${port}`
//        );
//    });
//}
//
//export default app;

import App from "./App";

const app = App.instance();

app.start();
