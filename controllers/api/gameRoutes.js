import express from "express";
const router = express.Router();
import { Game, Team, Date } from "../../models";

router.get("/", async (req, res) => {
	try {
		const games = await Game.findAll({
			attributes: ["id"],
			include: [
				{
					model: Date,
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				{
					model: Team,
					as: "home_team",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
				{
					model: Team,
					as: "away_team",
					attributes: {
						exclude: ["createdAt", "updatedAt"],
					},
				},
			],
		});
		res.status(200).json(games).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

export default router;
