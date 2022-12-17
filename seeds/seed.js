import sequelize from "../config/connection";
import { Date, Game, Pick, Team, User, Week } from "../models";
import userData from "./userData.json" assert { type: "json" };
import dateData from "./dateData.json" assert { type: "json" };
import teamData from "./teamData.json" assert { type: "json" };
import weekData from "./weekData.json" assert { type: "json" };

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	/* Generate User Data from JSON */
	const usersData = await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	});
	const users = usersData.map((element) => element.get({ plain: true }));

	/* Generate Date Data from JSON */
	const datesData = await Date.bulkCreate(dateData, {
		individualHooks: true,
		returning: true,
	});
	const dates = datesData.map((element) => element.get({ plain: true }));

	/* Generate Teams Data from JSON */
	const teamsData = await Team.bulkCreate(teamData, {
		individualHooks: true,
		returning: true,
	});
	const teams = teamsData.map((element) => element.get({ plain: true }));

	/** Dynamically generate Game Data based on insertion order of the games.
	 * Since the ids aren't always sequential, this preserves the team match-ups.
	 */
	let gameData = [];
	for (let i = 0; i < teams.length; i += 2) {
		gameData.push({
			away_team_id: teams[i].id,
			home_team_id: teams[i + 1].id,
			winner_id: teams[Math.floor(Math.random() * 2) + i].id,
			date_id: dates[0].id,
		});
	}
	const gamesData = await Game.bulkCreate(gameData, {
		individualHooks: true,
		returning: true,
	});
	const games = gamesData.map((element) => element.get({ plain: true }));

	/* Generate Week Data from JSON */
	const weeksData = await Week.bulkCreate(weekData, {
		individualHooks: true,
		returning: true,
	});
	const weeks = weeksData.map((element) => element.get({ plain: true }));

	/**
	 * Dynamically generate Pick Data based on the games created as well as random points per user
	 */
	let pickData = [];
	for (let i = 0; i < users.length; i++) {
		let points = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
		for (let j = 0; j < games.length; j++) {
			const { home_team_id, away_team_id } = games[j];
			const choices = [home_team_id, away_team_id];
			pickData.push({
				game_id: games[j].id,
				team_pick_id: choices[Math.floor(Math.random() * 2)],
				points: points.splice(
					Math.floor(Math.random() * points.length),
					1
				)[0],
				user_id: users[i].id,
			});
		}
	}
	const picksData = await Pick.bulkCreate(pickData, {
		individualHooks: true,
		returning: true,
	});
	const picks = picksData.map((element) => element.get({ plain: true }));
	process.exit(0);
};

seedDatabase();
