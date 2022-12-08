import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";

class Game extends Model {}

Game.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		team_1: {},
		team_2: {},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
		modelName: "user",
	}
);

export default Game;
