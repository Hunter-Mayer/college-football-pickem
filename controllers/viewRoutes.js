import express from "express";
const router = express.Router();
import { User } from "../models";
import ServerInterface from "../lib/serverInterface";

const SI = new ServerInterface();

router.get("/", async (req, res) => {
	try {
		const userData = await User.findAll({
			attributes: { exclude: ["password"] },
			order: [["name", "ASC"]],
		});

		const users = userData.map((project) => project.get({ plain: true }));

		res.render("homepage", {
			users,
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

router.get("/teampicker", (req, res) => {
	res.render("teampicker", {
		games: SI.getWeeklyPickForm(1, 1, 2023),
	});
});

router.get("/scoreboard", (req, res) => {
	res.render("scoreboard", {
		picks: SI.getWeeklyScoreboard(1, 2023),
	});
});

// TODO: Implement route and handlebar site. Stretch Goal. Leave commented unless implemented
// router.get("/statistics", (req, res) => {
// 	res.render("statistics");
// });

export default router;
