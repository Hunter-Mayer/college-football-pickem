import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";

class Team extends Model {}

Team.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		mascot: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		logo: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isURL: true,
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "team",
	}
);

export default Team;
