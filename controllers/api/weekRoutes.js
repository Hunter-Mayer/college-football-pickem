import express from "express";
const router = express.Router();
import { Sequelize } from "sequelize";
import { Week, Game, Date, Team, Pick, User } from "../../models";
import ServerInterface from "../../lib/serverInterface";

const serverInterface = new ServerInterface();

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

router.get("/all-week-nums", async (req, res) => {
	try {
		const weekNums = await Week.findAll({
			attributes: [
				Sequelize.fn("DISTINCT", Sequelize.col("week_num")),
				"week_num",
			],
			order: [["week_num", "DESC"]],
		});
		res.status(200).json(weekNums).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.get("/weeklyScoreboard", (req, res) => {
	try {
		const scores = serverInterface.getWeeklyScoreboard();
		console.log(scores);
		res.json(scores);
	} catch (error) {
		console.log(error);
	}

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
});

export default router;
