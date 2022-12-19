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

	isValidPick() {
		return (
			this.id != null &&
			this.gameId != null &&
			this.pickedTeamId != null &&
			this.points != null
		);
	}
}
