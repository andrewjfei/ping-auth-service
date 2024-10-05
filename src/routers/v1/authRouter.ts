import express, { Router } from "express";

import { AuthController } from "../../controllers";

const router: Router = express.Router();
const authController: AuthController = AuthController.instance();

router.post("/", authController.authenticateUser); 

export default router;
