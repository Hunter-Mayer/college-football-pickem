import express from "express";
const router = express.Router();
import apiRoutes from "./api";

router.use("/", viewRoutes);
router.use("/api", apiRoutes);

export default router;
