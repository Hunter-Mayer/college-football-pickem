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
