import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";
import Game from "./game";
import Team from "./team";
import User from "./user";

class Pick extends Model {}

Pick.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		game_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Game,
				key: "id",
			},
		},
		pick: {
			type: DataTypes.INTEGER,
			references: {
				model: Team,
				key: "id",
			},
		},
		points: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				isIn: [[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]],
			},
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "pick",
	}
);

export default Pick;
