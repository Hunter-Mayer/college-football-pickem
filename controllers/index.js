import express from "express";
const router = express.Router();
import apiRoutes from "./api";
import homeRoutes from "./homeRoutes";

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

export default router;
