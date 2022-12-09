import sequelize from "../config/connection";
import { Date, Game, Pick, Team, User, Week } from "../models";
import dateData from "./dateData.json" assert { type: "json" };
import gameData from "./gameData.json" assert { type: "json" };
import pickData from "./pickData.json" assert { type: "json" };
import teamData from "./teamData.json" assert { type: "json" };
import userData from "./userData.json" assert { type: "json" };
import weekData from "./weekData.json" assert { type: "json" };

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	await Date.bulkCreate(dateData, {
		individualHooks: true,
		returning: true,
	});

	await Game.bulkCreate(gameData, {
		individualHooks: true,
		returning: true,
	});

	await Pick.bulkCreate(pickData, {
		individualHooks: true,
		returning: true,
	});

	await Team.bulkCreate(teamData, {
		individualHooks: true,
		returning: true,
	});

	await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	});

	await Week.bulkCreate(weekData, {
		individualHooks: true,
		returning: true,
	});

	process.exit(0);
};

seedDatabase();
