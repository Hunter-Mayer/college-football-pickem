import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";

class Week extends Model {}

// TODO: Generate algorithm to dynamically assign a list of Game IDs instead of hardcoded columns
// TODO: Create a table dynamically for each week and use that table to store the list of games?
// TODO: Unsure how hardcoding games 1 through 10 will work with the controllers...
Week.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		game_1: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Game,
				key: "id",
			},
		},
		game_2: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Game,
				key: "id",
			},
		},
		game_3: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Game,
				key: "id",
			},
		},
		game_4: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Game,
				key: "id",
			},
		},
		game_5: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Game,
				key: "id",
			},
		},
		game_6: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Game,
				key: "id",
			},
		},
		game_7: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Game,
				key: "id",
			},
		},
		game_8: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Game,
				key: "id",
			},
		},
		game_9: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Game,
				key: "id",
			},
		},
		game_10: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Game,
				key: "id",
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "week",
	}
);

export default Week;
