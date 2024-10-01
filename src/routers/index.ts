import express, { Router } from "express";
import v1Router from "./v1";

const router: Router = express.Router();

router.use("/status", (_req, res) => {
    res.json({ status: "online" });
});

router.use("/v1", v1Router);

export default router;
