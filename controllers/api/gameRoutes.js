import express from "express";
import { Sequelize } from "sequelize";
const router = express.Router();
import { Game, Team, Date, Week } from "../../models";

const gameAssociations = [
	{
		model: Date,
		attributes: { exclude: ["createdAt", "updatedAt"] },
	},
	{
		model: Team,
		as: "home_team",
		attributes: { exclude: ["createdAt", "updatedAt"] },
	},
	{
		model: Team,
		as: "away_team",
		attributes: { exclude: ["createdAt", "updatedAt"] },
	},
	{
		model: Week,
		attributes: ["id", "week_num"],
	},
];

router.get("/", async (req, res) => {
	try {
		const games = await Game.findAll({
			attributes: ["id"],
			include: gameAssociations,
		});
		res.status(200).json(games).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.post("/", async (req, res) => {
	// Create a new game
	/**
	 * Request body JSON Format:
	 * {
	 * 	home_team_id: "home team id as an integer",
	 * 	away_team_id: "away team id as an integer",
	 * 	date_id: "date id as an integer"
	 * }
	 */
	try {
		const newGame = await Game.create(req.body);
		res.status(201).json(newGame).send();
	} catch (err) {
		if (err instanceof Sequelize.ValidateError) {
			res.status(400).send(`<h1>400 Bad Request!</h1>
			<h3>Specified id does not exist.</h3>`);
		} else {
			res.status(500).send(`<h1>500 Internal Server Error</h1>`);
		}
		console.error(err);
	}
});

export default router;
