import Sequelize from "sequelize";
import dotenv from "dotenv";
dotenv.config();

let sequelize;

// Checks if the server is deployed on heroku. If so, uses the URL provided by JAWSDB_URL. Otherwise, uses the database information stored in the local .env file
if (process.env.JAWSDB_URL) {
	sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
	sequelize = new Sequelize(
		process.env.DB_NAME,
		process.env.DB_USER,
		process.env.DB_PASSWORD,
		{
			host: "localhost",
			dialect: "mysql",
			port: 3306,
		}
	);
}

export default sequelize;
