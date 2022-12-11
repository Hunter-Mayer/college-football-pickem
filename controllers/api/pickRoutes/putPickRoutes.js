import express from "express";
const router = express.Router();
import { Game, Pick, Team, User, Date, Week } from "../../../models";

router.put("/", async (req, res) => {
	try {
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

export default router;
