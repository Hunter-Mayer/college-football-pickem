import express from "express";
const router = express.Router();
import apiRoutes from "./api";
import viewRoutes from "./viewRoutes";

router.use("/", viewRoutes);
router.use("/api", apiRoutes);

export default router;
