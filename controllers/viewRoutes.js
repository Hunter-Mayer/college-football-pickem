import express from "express";
const router = express.Router();
import { Game, Date, Team, User, Week, Pick } from "../models";
import { Sequelize } from "sequelize";
import ServerInterface from "../lib/serverInterface";

const SI = new ServerInterface();

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

// replace withAuth,
router.get("/", async (req, res) => {
	try {
		const userData = await User.findAll({
			attributes: { exclude: ["password"] },
			order: [["name", "ASC"]],
		});

		const users = userData.map((project) => project.get({ plain: true }));

		res.render("homepage", {
			users,
			data: SI.getSeasonData(),
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/login", (req, res) => {
	if (req.session.logged_in) {
		res.redirect("../");
		return;
	}
	res.render("login");
});

router.get("/logout", (req, res) => {
	res.redirect("../");
});

router.get("/teampicker", async (req, res) => {
	let picks;

	try {
		const weekData = await Week.findOne({
			attributes: ["week_num"],
			order: [["week_num", "DESC"]],
		});
		const week = weekData.get({ plain: true });

		userAssociations.where = { id: req.session.user_id };
		gameAssociations.include[3].where = {
			week_num: week.week_num,
		};
		picks = await Pick.findAll({
			attributes: ["id", "points"],
			include: [gameAssociations, userAssociations, teamPickAssociations],
		});

		picks = picks.map((element) => element.get({ plain: true }));
		console.log(picks);
		res.render("teampicker", {
			picks: picks,
			logged_in: req.session.logged_in,
		});
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.get("/scoreboard", async (req, res) => {
	const weekNums = await Week.findAll({
		attributes: [
			Sequelize.fn("DISTINCT", Sequelize.col("week_num")),
			"week_num",
		],
		order: [["week_num", "DESC"]],
	});
	const weeks = weekNums.map((element) => element.get({ plain: true }));

	gameAssociations.include[3].where = { week_num: weeks[0] };
	const pickData = await Pick.findAll({
		attributes: ["id", "points"],
		include: [gameAssociations, userAssociations, teamPickAssociations],
		order: [["user_id", "ASC"]],
	});

	const picks = pickData.map((element) => element.get({ plain: true }));

	console.log(picks);

	res.render("scoreboard", {
		weeks: weeks,
		picks: picks,
		logged_in: req.session.logged_in,
	});
});

// TODO: Implement route and handlebar site. Stretch Goal. Leave commented unless implemented
// router.get("/statistics", (req, res) => {
// 	res.render("statistics");
// });

export default router;
