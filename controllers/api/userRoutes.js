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
		console.log(newUser);
		// Make sure we save the credentials to the session so that the user automatically logins upon account creation
		req.session.save(() => {
			req.session.user_id = newUser.id;
			req.session.logged_in = true;

			res.json({ user: userData, message: "You are now logged in!" });
		});
	} catch (err) {
		console.log(err);
		res.status(400).send();
	}
});

export default router;
