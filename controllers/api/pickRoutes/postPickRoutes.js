import express from "express";
const router = express.Router();
import { Game, Pick, Team, User, Date, Week } from "../../../models";

// Requires
router.post("/", async (req, res) => {
	/**
	 * Request body for Pick as JSON:
	 * {
	 * 	game_id: "game id as an integer",
	 * 	team_pick_id: "picked team id as an integer",
	 * 	points: "points wagered as an integer",
	 * 	user_id: "supplied user as its id as an integer"
	 * }
	 */
	try {
		const newPick = await Pick.create(req.body);
		res.status(201).json(newPick).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

export default router;
