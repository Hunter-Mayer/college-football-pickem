import User from "./user";
import Pick from "./pick";
import Week from "./week";
import Game from "./game";
import Team from "./team";
import UserWeekPick from "./userweekpick";

// TODO: Implement associations
// User associations
User.hasMany(Pick, {
	onDelete: "CASCADE",
	foreignKey: "user_id",
});

// Pick associations
Pick.hasOne(Game, {
	foreignKey: "game_id",
});

Pick.hasOne(Team, {
	foreignKey: "pick",
});

Pick.belongsTo(User, {
	foreignKey: "user_id",
});

// Week associations

// Week.hasOne(Game, {
// 	foreignKey: "id",
// 	as: "game_1",
// });

// Week.hasOne(Game, {
// 	foreignKey: "id",
// 	as: "game_2",
// });

// Week.hasOne(Game, {
// 	foreignKey: "id",
// 	as: "game_3",
// });

// Week.hasOne(Game, {
// 	foreignKey: "id",
// 	as: "game_4",
// });

// Week.hasOne(Game, {
// 	foreignKey: "id",
// 	as: "game_5",
// });

// Week.hasOne(Game, {
// 	foreignKey: "id",
// 	as: "game_6",
// });

// Week.hasOne(Game, {
// 	foreignKey: "id",
// 	as: "game_7",
// });

// Week.hasOne(Game, {
// 	foreignKey: "id",
// 	as: "game_8",
// });

// Week.hasOne(Game, {
// 	foreignKey: "id",
// 	as: "game_9",
// });

// Week.hasOne(Game, {
// 	foreignKey: "id",
// 	as: "game_10",
// });

// Game associations
Game.belongsToMany(Pick, {
	through: UserWeekPick,
	foreignKey: "game_id",
});

Game.hasOne(Team, {
	foreignKey: "id",
});

Game.hasOne(Team, {
	foreignKey: "id",
});

Game.belongsTo(Week, {
	foreignKey: "game_1",
});

Game.belongsTo(Week, {
	foreignKey: "game_2",
});

Game.belongsTo(Week, {
	foreignKey: "game_3",
});

Game.belongsTo(Week, {
	foreignKey: "game_4",
});

Game.belongsTo(Week, {
	foreignKey: "game_5",
});

Game.belongsTo(Week, {
	foreignKey: "game_6",
});

Game.belongsTo(Week, {
	foreignKey: "game_7",
});

Game.belongsTo(Week, {
	foreignKey: "game_8",
});

Game.belongsTo(Week, {
	foreignKey: "game_9",
});

Game.belongsTo(Week, {
	foreignKey: "game_10",
});

// Team associations
Team.belongsToMany(Game, {
	through: UserWeekPick,
	foreignKey: "home",
});

Team.belongsToMany(Game, {
	through: UserWeekPick,
	foreignKey: "away",
});

Team.belongsToMany(Pick, {
	through: UserWeekPick,
	foreignKey: "pick",
});

// UserWeekPick associations
// TODO: Maybe this isn't needed...

export { User, Pick, Week, Game, UserWeekPick };
