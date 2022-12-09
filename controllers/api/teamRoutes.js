import express from "express";
import { Sequelize } from "sequelize";
const router = express.Router();
import { Team } from "../../models";

router.post("/", async (req, res) => {
	try {
		const newTeam = await Team.create(req.body);
		req.status(201).json(newTeam).send();
	} catch (err) {
		if (err instanceof Sequelize.ValidationError) {
			res.status(400).send(`<h1>400 Bad Request!</h1>
			<h3>Specified id does not exist.</h3>`);
		} else {
			res.status(500).send(`<h1>500 Internal Server Error</h1>`);
		}
		console.error(err);
	}
});

export default router;
