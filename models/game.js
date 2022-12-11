import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";
import Team from "./team";
import Date from "./date";

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
		home_team_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Team,
				key: "id",
			},
		},
		away_team_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Team,
				key: "id",
			},
		},
		date_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Date,
				foreignKey: "id",
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
