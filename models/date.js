import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";

class Date extends Model {}

Date.init(
	{
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		year: {
			type: DataTypes.INTEGER,
			allowNull: false,
            validate: {
                min: 1900 // TODO: Which date makes sense for the start of the league? 2023?
            }
		},
		month: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
				max: 12,
                // TODO: CUstom validator for month
			},
		},
		day: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				min: 1,
				max: 31,
				// TODO: Custom validator for day based on month
			},
		},
	},
	{
		sequelize,
		timestamps: true,
		freezeTableName: true,
		underscored: true,
		modelName: "date",
	}
);

export default Date;
