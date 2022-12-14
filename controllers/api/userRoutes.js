import express from "express";
const router = express.Router();
import { User } from "../../models";

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
		res.status(200).send();
	} catch (err) {
		res.status(400).send();
	}
});

router.post("/logout", (req, res) => {
	if (req.session.logged_in) {
		req.session.destroy(() => {
			res.status(204).end();
		});
	} else {
		res.status(404).send();
	}
});

router.post("/signup", async (req, res) => {
	try {
		const userData = await User.findOne({
			where: { email: req.body.email },
		});
		if (userData) {
			res.status(400).json({
				message: "Email already exists",
			});
		}
		console.log(req.body);
		const newUserData = await User.create(req.body);
		const newUser = newUserData.get({ plain: true });
		res.status(201).json(newUser).send();
		// res.render("homepage", {
		// 	newUser,
		// 	logged_in: req.session.logged_in,
		// });
	} catch (err) {
		console.log(err);
		res.status(400).send();
	}
});

export default router;
