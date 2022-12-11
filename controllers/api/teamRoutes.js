import express from "express";
import { Sequelize } from "sequelize";
const router = express.Router();
import { Team } from "../../models";

// Get all teams
router.get("/", async (req, res) => {
	try {
		const teams = await Team.findAll();
		if (teams.length === 0) {
			res.status(404).send(`<h1>404 Data Not Found!</h1>
            <h3>No Categories Available</h3>`);
			return;
		}
		res.status(200).json(teams).send();
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

// Add team(s)...
router.post("/", async (req, res) => {
	/** JSON format for Team Model
	 * id and timestamps are automatically generated
	 * {
	 * name: "name_value",
	 * mascot: "mascot_name",
	 * logo: "url to picture of logo"
	 * */
	// TODO: Handle error for when unique name constraint is not met
	try {
		// For just one team
		if (!req.body.length) {
			const newTeam = await Team.create(req.body);
			res.status(201).json(newTeam).send();
		} else {
			// For multiple teams
			const newTeams = await Team.bulkCreate(req.body);
			res.status(201).json(newTeams).send();
		}
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

router.delete("/:id", async (req, res) => {
	try {
		const exists = await Team.findOne({ where: { id: req.params.id } });
		if (exists) {
			await Team.destroy({ where: { id: req.params.id } });
			res.status(204).send();
		} else {
			res.status(404).send(`<h1>404 Data Not Found!</h1>
	<h3>No Tags Available</h3>`);
		}
	} catch (err) {
		console.error(err);
		res.status(500).send(`<h1>500 Internal Server Error</h1>`);
	}
});

export default router;
