import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";
import User from "./user";

class Group extends Model {}

Group.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		owner_id: {
			type: DataTypes.STRING,
			allowNull: false,
			references: {
				model: User,
				key: "id",
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "group",
	}
);

export default Group;
