export default class Pick {
	constructor(
		id = null,
		gameId = null,
		pickedTeamId = null,
		points = null,
		userId = null
	) {
		this.id = id;
		this.gameId = gameId;
		this.pickedTeamId = pickedTeamId;
		this.points = points;
		this.userId = userId;
	}

	getSimple() {
		return {
			id: this.id,
			game_id: this.gameId,
			team_pick_id: this.team_pick_id,
			points: this.points,
			user_id: this.userId,
		};
	}
}
