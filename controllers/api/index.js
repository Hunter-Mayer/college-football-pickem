import express from "express";
const router = express.Router();
import gameRoutes from "./gameRoutes";
import pickRoutes from "./pickRoutes";
import teamRoutes from "./teamRoutes";
import userRoutes from "./userRoutes";
import weekRoutes from "./weekRoutes";

router.use("/game", gameRoutes);
router.use("/pick", pickRoutes);
router.use("/team", teamRoutes);
router.use("/users", userRoutes);
router.use("/week", weekRoutes);

export default router;
