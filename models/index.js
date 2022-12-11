import Pick from "./pick";
import Game from "./game";
import Week from "./week";
import User from "./user";
import Team from "./team";
import Date from "./date";

// Pick - Game Model association
Game.hasMany(Pick, {
	foreignKey: "game_id",
});
Pick.belongsTo(Game, {
	foreignKey: "game_id",
});

// Pick - Team Model association
Team.hasMany(Pick, {
	foreignKey: "team_pick_id",
});
Pick.belongsTo(Team, {
	foreignKey: "team_pick_id",
	as: "picked_team",
});

// Pick - User Model association
User.hasMany(Pick, {
	foreignKey: "user_id",
});
Pick.belongsTo(User, {
	foreignKey: "user_id",
});

// Game - Team Model association
Team.hasMany(Game, {
	foreignKey: "home_team_id",
});
Game.belongsTo(Team, {
	foreignKey: "home_team_id",
	as: "home_team",
});

Team.hasMany(Game, {
	foreignKey: "away_team_id",
});
Game.belongsTo(Team, {
	foreignKey: "away_team_id",
	as: "away_team",
});

// Game - Date Model association
Date.hasMany(Game, {
	foreignKey: "date_id",
});
Game.belongsTo(Date, {
	foreignKey: "date_id",
});

// Week - Game Model association
Game.hasMany(Week, {
	foreignKey: "game_id",
});
Week.belongsTo(Game, {
	foreignKey: "game_id",
});

export { Pick, Game, Week, User, Team, Date };
