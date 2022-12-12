import express from "express";
const router = express.Router();
import gameRoutes from "./gameRoutes";
import pickRoutes from "./pickRoutes";
import teamRoutes from "./teamRoutes";
import userRoutes from "./userRoutes";
import weekRoutes from "./weekRoutes";
import dateRoutes from "./dateRoutes";

router.use("/game", gameRoutes);
router.use("/pick", pickRoutes);
router.use("/team", teamRoutes);
router.use("/users", userRoutes);
router.use("/week", weekRoutes);
router.use("/date", dateRoutes);

export default router;
