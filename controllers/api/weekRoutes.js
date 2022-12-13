import express from "express";
const router = express.Router();
import { Week, Game, Date, Team, Pick, User } from "../../models";
import ServerInterface from "../../lib/serverInterface";

const serverInterface = new ServerInterface()

const weekAssociations = [
	{
		model: Game,
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
	},
];

router.get("/", async (req, res) => {
	try {
		const weekData = await Week.findAll({
			include: weekAssociations,
		});
		res.status(200).json(weekData).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.get("/:week_num", async (req, res) => {
	try {
		const weekData = await Week.findAll({
			attributes: ["id", "week_num"],
			include: weekAssociations,
			where: {
				week_num: req.params.week_num,
			},
		});
		res.status(200).json(weekData).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.get("/weeklyScoreboard", (req, res) => {
	try {
		const scores = (serverInterface.getWeeklyScoreboard())
		res.json (scores)	
	} catch(error){
		console.log(error)
	}
	
})

export default router;
