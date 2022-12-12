import express from "express";
const router = express.Router();
import { Game, Pick, Team, User, Date, Week } from "../../../models";

/**
 * USES QUERY PARAMETERS
 * ONLY UPDATES THE PICKED TEAM AND THE AMOUNT OF POINTS
 */
router.put("/", async (req, res) => {
	/**
	 * req.query.id
	 * req.query.team_pick_id
	 * req.query.points
	 */

	const pickExists = async () => {
		return (
			await Pick.findAll({
				attributes: ["id"],
			})
		)
			.map((element) => element.dataValues.id)
			.includes(Number(req.params.id));
	};

	if (pickExists) {
		try {
			const updatedPick = await Pick.update(
				{
					team_pick_id: req.query.team_pick_id,
					points: req.query.points,
				},
				{ where: { id: req.query.id } }
			);

			// updatePick will have a length of 1 if the value was updated. Otherwise, no update was performed
			if (updatedPick[0]) {
				res.status(204).send();
			} else {
				res.status(304).send();
			}
		} catch (err) {
			console.error(err);
			res.status(500).send(`<h1>500 Internal Server Error</h1>`);
		}
	} else {
		try {
			const newPick = await Pick.create({
				game_id: req.query.game_id,
				team_pick_id: req.query.team_pick_id,
				points: req.query.points,
				user_id: req.query.user_id,
			});
			res.status(201).json(newPick).send();
		} catch (err) {
			console.error(err);
			res.status(500).send(`<h1>500 Internal Server Error</h1>`);
		}
	}
});

export default router;
