import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";

class UserWeekPick extends Model {}

UserWeekPick.init(
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

export default UserWeekPick;
