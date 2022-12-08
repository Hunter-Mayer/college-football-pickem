import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";
import User from "user";
import Week from "week";
import Pick from "pick";

class UserWeekPick extends Model {}

UserWeekPick.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: "id",
			},
		},
		week_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Week,
				key: "id",
			},
		},
		pick_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Pick,
				key: "id",
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "userweekpick",
	}
);

export default UserWeekPick;
