import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";
import Team from "team";

class Game extends Model {}

// Each team has a home and away team rather than team_1 and team_2
Game.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		home: {
			type: DataTypes.INTEGER,
			references: {
				model: Team,
				key: "id",
			},
		},
		away: {
			type: DataTypes.INTEGER,
			references: {
				model: Team,
				key: "id",
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "game",
	}
);

export default Game;
