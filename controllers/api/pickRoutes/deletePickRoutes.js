import express from "express";
const router = express.Router();
import { Game, Pick, Team, User, Date, Week } from "../../../models";

// TODO?
router.delete("/", async (req, res) => {
	res.sendStatus(500);
});

export default router;
