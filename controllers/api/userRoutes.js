import express from "express";
const router = express.Router();
import { Date, User, Game, Week, Team, Pick } from "../../models";

router.post("/login", async (req, res) => {
	try {
		const userData = await User.findOne({
			where: { email: req.body.email },
		});

		if (!userData) {
			res.status(400).json({
				message: "Incorrect email or password, please try again",
			});
			return;
		}

		const validPassword = await userData.checkPassword(req.body.password);

		if (!validPassword) {
			res.status(400).json({
				message: "Incorrect email or password, please try again",
			});
			return;
		}

		req.session.save(() => {
			req.session.user_id = userData.id;
			req.session.logged_in = true;
			res.json({ user: userData, message: "You are now logged in!" });
		});
	} catch (err) {
		console.log(err);
		res.status(400).send();
	}
});

router.post("/logout", (req, res) => {
	if (req.session.logged_in) {
		// Remove the session variables
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).end();
	}
});
router.post("/signup", async (req, res) => {
	try {
		const userData = await User.findOne({
			where: { email: req.body.email },
		});
		if (userData) {
			res.status(400).json({ message: "Email already exists" });
		}

		const newUserData = await User.create(req.body);
		const newUser = newUserData.get({ plain: true });

		/**
		 * Make sure we add blank week entries for this user upon account creation
		 */
		let weekAssociations = [
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
						model: Team,
						as: "winner",
						attributes: {
							exclude: ["createdAt", "updatedAt"],
						},
					},
				],
			},
		];
		const weekNums = await Week.aggregate("week_num", "DISTINCT", {
			plain: false,
		});
		const weeks = weekNums.map((element) => element.DISTINCT);

		const gameData = await Week.findAll({
			attributes: ["id", "week_num"],
			include: weekAssociations,
			where: {
				week_num: weeks[0],
			},
			order: [[Game, "id", "ASC"]],
		});
		const games = gameData.map((element) => element.get({ plain: true }));

		let pickData = [];
		for (let i = 0; i < games.length; i++) {
			pickData.push({
				game_id: games[i].id,
				team_pick_id: null,
				points: 0,
				user_id: newUser.id,
			});
		}

		const picksData = await Pick.bulkCreate(pickData, {
			individualHooks: true,
			returning: true,
		});
		const picks = picksData.map((element) => element.get({ plain: true }));

		// Make sure we save the credentials to the session so that the user automatically logins upon account creation
		req.session.save(() => {
			req.session.user_id = newUser.id;
			req.session.logged_in = true;
			res.json({ user: newUser, message: "You are now logged in!" });
		});
	} catch (err) {
		console.log(err);
		res.status(400).send();
	}
});

export default router;
