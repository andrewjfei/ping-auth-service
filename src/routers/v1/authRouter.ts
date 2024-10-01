import express, { Router } from "express";

import { authenticateUser } from "../../controllers/authController";

const router: Router = express.Router();

router.post("/", authenticateUser);

export default router;
