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
Pick.belongsTo(Game);

// Pick - Team Model association
Team.hasMany(Pick, {
	foreignKey: "pick",
});
// Using Pick.belongsTo results in an additional id called team_id

// Pick - User Model association
User.hasMany(Pick, {
	foreignKey: "user_id",
});
Pick.belongsTo(User);

// Game - Team Model association
Team.hasMany(Game, {
	foreignKey: "home_team",
});
Team.hasMany(Game, {
	foreignKey: "away_team",
});
// Using Game.belongsTo results in duplicate foreign keys or association conflicts between the keys

// Game - Date Model association
Date.hasMany(Game, {
	foreignKey: "date_id",
});
Game.belongsTo(Date);

// Week - Game Model association
Game.hasMany(Week, {
	foreignKey: "game_id",
});
Week.belongsTo(Game);

export { Pick, Game, Week, User, Team, Date };
