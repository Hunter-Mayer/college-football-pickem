import express from "express";
const router = express.Router();
import getPickRoutes from "./getPickRoutes";
import postPickRoutes from "./postPickRoutes";
import putPickRoutes from "./putPickRoutes";
import deletePickRoutes from "./deletePickRoutes";

router.use("/", getPickRoutes);
router.use("/", postPickRoutes);
router.use("/", putPickRoutes);
router.use("/", deletePickRoutes);

export default router;
