import { Model, DataTypes } from "sequelize";
import sequelize from "../config/connection";

class Pick extends Model {}

Pick.init(
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

export default Pick;
