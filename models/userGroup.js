import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";
import User from "./user";
import Group from "./group";

class UserGroup extends Model {}

UserGroup.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		group_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Group,
				key: "id",
			},
		},
		group_owner_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Group,
				key: "owner_id",
			},
		},
		user_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
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
		modelName: "user_group",
	}
);

export default UserGroup;
