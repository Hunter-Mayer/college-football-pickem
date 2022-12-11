import express from "express";
const router = express.Router();
import { Game, Pick, Team, User, Date, Week } from "../../models";

const pickAssociations = [
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
			{
				model: Week,
				attributes: ["id", "week_num"],
			},
		],
	},
	{
		model: User,
		attributes: ["id", "name"],
	},
	{
		model: Team,
		as: "picked_team",
		attributes: {
			exclude: ["createdAt", "updatedAt"],
		},
	},
];

// TODO: Implement query handler requests...
router.get("/", async (req, res) => {
	try {
		const picks = await Pick.findAll({
			attributes: ["id", "points"],
			include: pickAssociations,
		});
		res.status(200).json(picks).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.get("/user/:user_id", async (req, res) => {
	try {
		const picks = await Pick.findAll({
			attributes: ["id", "points"],
			include: pickAssociations,
			where: {
				user_id: req.params.user_id,
			},
		});
		res.status(200).json(picks).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.post("/", async (req, res) => {
	try {
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.put("/", async (req, res) => {
	try {
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

// TODO?
// router.delete("/", async (req, res) => {});

export default router;
