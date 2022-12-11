import express from "express";
const router = express.Router();
import { Game, Pick, Team, User, Date, Week } from "../../../models";

let gameAssociations = {
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
};

let userAssociations = {
	model: User,
	attributes: ["id", "name"],
};

let teamPickAssociations = {
	model: Team,
	as: "picked_team",
	attributes: {
		exclude: ["createdAt", "updatedAt"],
	},
};

// TODO: Implement query handler requests...
router.get("/", async (req, res) => {
	try {
		const picks = await Pick.findAll({
			attributes: ["id", "points"],
			include: [gameAssociations, userAssociations, teamPickAssociations],
		});
		res.status(200).json(picks).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.get("/user/:user_id", async (req, res) => {
	userAssociations.where = { id: req.params.user_id };
	try {
		const picks = await Pick.findAll({
			attributes: ["id", "points"],
			include: [gameAssociations, userAssociations, teamPickAssociations],
		});
		res.status(200).json(picks).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.get("/week/:week_num", async (req, res) => {
	gameAssociations.include[3].where = { week_num: req.params.week_num };
	try {
		const picks = await Pick.findAll({
			attributes: ["id", "points"],
			include: [gameAssociations, userAssociations, teamPickAssociations],
		});
		res.status(200).json(picks).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.get("/user/:user_id/week/:week_num", async (req, res) => {
	userAssociations.where = { id: req.params.user_id };
	gameAssociations.include[3].where = {
		week_num: req.params.week_num,
	};
	try {
		const picks = await Pick.findAll({
			attributes: ["id", "points"],
			include: [gameAssociations, userAssociations, teamPickAssociations],
		});
		res.status(200).json(picks).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

export default router;
