import path from "path";
import express from "express";
import session from "express-session";
import exphbs from "express-handlebars";
import routes from "./controllers";
import hbsHelpers from "handlebars-helpers";
const helpers = hbsHelpers();
import sequelize from "./config/connection";
import sequelizeSession from "connect-session-sequelize";
const SequelizeStore = sequelizeSession(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

const sess = {
	secret: process.env.SESSION_SECRET,
	cookie: {
		maxAge: 1000 * 60 * 45
	},
	resave: false,
	saveUninitialized: true,
	store: new SequelizeStore({
		db: sequelize,
	}),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve("./public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
	app.listen(PORT, () =>
		console.log(`\n\nServer listening on http://localhost:${PORT}\n`)
	);
});
