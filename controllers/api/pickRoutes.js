import express from "express";
const router = express.Router();
import { Game, Pick, Team, User, Date } from "../../models";

// TODO: Implement query handler requests...
router.get("/", async (req, res) => {
	try {
		const picks = await Pick.findAll({
			include: [Game, User, Team, Date],
		});
		console.log(picks);
		res.status(200).json(picks).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

router.get("/user/:user_id", async (req, res) => {
	try {
		const picks = await Pick.findAll({
			where: {
				user_id: req.params.user_id,
			},
		});
		console.log(picks);
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
