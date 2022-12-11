import sequelize from "../config/connection";

export default class ServerInterface {
	constructor() {}

	// TODO: implement full method
	getWeeklyPickForm(userId, weekNum, year = null) {
		// Returning 10 different games
		// If user has submitted a previous form, it'll return points value and chosen team
		/**
		 * Result provides home team, away team, chosen team (pick), AND points value.
		 * The user is already known so that information is NOT provided.
		 */
		const result = [
			{
				home_team: "Texas Longhorns",
				away_team: "Alabama Crimson Tide",
				pick: "Alabama Crimson Tide",
				points: 1,
			},
			{
				home_team: "Appalachian State Mountaineers",
				away_team: "Texas A&M Aggies",
				pick: "Texas A&M Aggies",
				points: 2,
			},
			{
				home_team: "BYU Cougars",
				away_team: "Baylor Bears",
				pick: "Baylor Bears",
				points: 3,
			},
			{
				home_team: "Stanford Cardinal",
				away_team: "USC Trojans",
				pick: "USC Trojans",
				points: 4,
			},
			{
				home_team: "Pittsburgh Panthers",
				away_team: "Tennessee Volunteers",
				pick: "Tennessee Volunteers",
				points: 5,
			},
			{
				home_team: "South Carolina Gamecocks",
				away_team: "Arkansas Razorbacks",
				pick: "Arkansas Razorbacks",
				points: 6,
			},
			{
				home_team: "Hawai'i Rainbow Warriors",
				away_team: "Michigan Wolverines",
				pick: "Michigan Wolverines",
				points: 7,
			},
			{
				home_team: "Arkansas State Red Wolves",
				away_team: "Ohio State Buckeyes",
				pick: "Ohio State Buckeyes",
				points: 8,
			},
			{
				home_team: "Washington State Cougars",
				away_team: "Wisconsin Badgers",
				pick: "Wisconsin Badgers",
				points: 9,
			},
			{
				home_team: "Arizona State Sun Devils",
				away_team: "Oklahoma State Cowboys",
				pick: "Oklahoma State Cowboys",
				points: 10,
			},
		];
		return result;
	}

	// TODO: Implement full method
	getWeeklyScoreboard(weekNum, year = null) {
		// Returns all data for the weekly scoreboard
		/**
		 * Returns all picks for each user for the specified weekNum and year
		 * Each pick will contain the chosen team and points.
		 * Return object will be formatted as a list of json objects comprising nested objects/lists.
		 */
		const result = [
			{
				user: "Sal",
				picks: [
					{
						pick: "Alabama",
						points: 1,
					},
					{
						pick: "Texas A&M",
						points: 2,
					},
					{
						pick: "Baylor",
						points: 3,
					},
					{
						pick: "USC",
						points: 4,
					},
					{
						pick: "Tennessee",
						points: 5,
					},
					{
						pick: "Arkansas",
						points: 6,
					},
					{
						pick: "Michigan",
						points: 7,
					},
					{
						pick: "Ohio State",
						points: 8,
					},
					{
						pick: "Wisconsin",
						points: 9,
					},
					{
						pick: "Oklahoma State",
						points: 10,
					},
				],
			},
			{
				user: "Sal",
				picks: [
					{
						pick: "Alabama",
						points: 1,
					},
					{
						pick: "Texas A&M",
						points: 2,
					},
					{
						pick: "Baylor",
						points: 3,
					},
					{
						pick: "USC",
						points: 4,
					},
					{
						pick: "Tennessee",
						points: 5,
					},
					{
						pick: "Arkansas",
						points: 6,
					},
					{
						pick: "Michigan",
						points: 7,
					},
					{
						pick: "Ohio State",
						points: 8,
					},
					{
						pick: "Wisconsin",
						points: 9,
					},
					{
						pick: "Oklahoma State",
						points: 10,
					},
				],
			},
			{
				user: "Sal",
				picks: [
					{
						pick: "Alabama",
						points: 1,
					},
					{
						pick: "Texas A&M",
						points: 2,
					},
					{
						pick: "Baylor",
						points: 3,
					},
					{
						pick: "USC",
						points: 4,
					},
					{
						pick: "Tennessee",
						points: 5,
					},
					{
						pick: "Arkansas",
						points: 6,
					},
					{
						pick: "Michigan",
						points: 7,
					},
					{
						pick: "Ohio State",
						points: 8,
					},
					{
						pick: "Wisconsin",
						points: 9,
					},
					{
						pick: "Oklahoma State",
						points: 10,
					},
				],
			},
		];
		return result;
	}

	// TODO: Implement method
	getSeasonData(year = null) {
		// Return all data for the entire football season
		/**
		 * Returns the cumulative sum of points for each user
		 *
		 * Return object will be a list of each user and their points
		 */
	}
}
