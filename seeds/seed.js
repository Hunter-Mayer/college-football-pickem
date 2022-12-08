import sequelize from "../config/connection";
import { User } from "../models";
import userData from "./userData.json" assert { type: "json" };

const seedDatabase = async () => {
	await sequelize.sync({ force: true });

	await User.bulkCreate(userData, {
		individualHooks: true,
		returning: true,
	});

	process.exit(0);
};

seedDatabase();
