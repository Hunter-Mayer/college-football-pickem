import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";

class Week extends Model {}

Week.init(
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

export default Week;
