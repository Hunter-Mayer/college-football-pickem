import express from "express";
const router = express.Router();
import userRoutes from "./userRoutes";

router.use("/users", userRoutes);

export default router;
