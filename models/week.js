import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";
import Game from "./game";

class Week extends Model {}

Week.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		week_num: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		game_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Game,
				foreignKey: "id",
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
