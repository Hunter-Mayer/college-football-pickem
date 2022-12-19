import Pick from "./lib/pick.js";

let userId;
let pickIds = [];
let gameIds = [];
let pickedTeamIds = [];
let points = [];

const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const editPicks = document.getElementById("editPick");

function generateEmptyPicks(count) {
	const picks = [];
	for (let i = 0; i < count; i++) {
		picks.push(new Pick());
	}
	return picks;
}

function updateFormSelectionData() {
	let pickContainers = document.getElementsByClassName("pick-container");
	let gameContainers = document.getElementsByClassName("game-container");
	let pickedTeamForms = document.getElementsByClassName("team-picker-form");
	let pointContainers = document.getElementsByClassName("pick-points");

	let picks = generateEmptyPicks(pickContainers.length);
	for (let i = 0; i < picks.length; i++) {
		/**
		 * To make unique ids, each id was prefixed with pick, game, or team. As such, the actual id must be extracted from the id before making an api call
		 */
		picks[i].id = pickContainers[i].id.replace("pick-", "");
		picks[i].gameId = gameContainers[i].id.replace("game-", "");

		/**
		 * If a team is selected, update its id in the pick entry. Otherwise, save the picked team as null
		 */
		let awayTeam = pickedTeamForms[i][0];
		let homeTeam = pickedTeamForms[i][1];
		if (awayTeam.checked) {
			picks[i].pickedTeamId = awayTeam.id.replace("team-", "");
		} else if (homeTeam.checked) {
			picks[i].pickedTeamId = homeTeam.id.replace("team-", "");
		} else {
			picks[i].pickedTeamId = null;
		}

		/**
		 * To get the points, we must iterate over all available options and select the one that the user has selected via the HTML attribute selected
		 */
		for (const option of pointContainers[i]) {
			if (option.selected) {
				picks[i].points = option.value;
			}
		}
	}

	console.log(picks);

	return picks;
}
/**
 * Creates alert banner when you've submitted the picks. Styling provided by bootstrap
 */
const alert = (message, type) => {
	const wrapper = document.createElement("div");
	wrapper.innerHTML = [
		`<div class="alert alert-${type} alert-dismissible" role="alert">`,
		`   <div>${message}</div>`,
		'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
		"</div>",
	].join("");

	alertPlaceholder.append(wrapper);
};

editPicks.addEventListener("click", async (event) => {
	event.preventDefault();
	let picks = updateFormSelectionData();

	const apiUrl = new URL(document.location.origin + "/api/pick");
	for (let i = 0; i < picks.length; i++) {
		/**
		 * Need to provide
		 * pick id
		 * game id
		 * picked team id
		 * points
		 */
		apiUrl.searchParams.set("id", picks[i].id);
		apiUrl.searchParams.set("game_id", picks[i].gameId);
		apiUrl.searchParams.set("team_pick_id", picks[i].pickedTeamId);
		apiUrl.searchParams.set("points", picks[i].points);
		/**
		 * Checks for valid pick objects and only makes a PUT request to the API of the pick is valid
		 */
		const response = await fetch(apiUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			console.log("Pick submitted!");
		} else {
			console.error("Pick was not submitted");
		}
	}
	// if (updateStatus === null) {
	// 	alert(
	// 		"You must select at least one team to update your picks",
	// 		"danger"
	// 	);
	// 	return;
	// } else if (!updateStatus) {
	// 	alert(
	// 		" Not all picks were updated. Resubmit when all picks are updated.",
	// 		"warning"
	// 	);
	// }
	alert("Your picks have been updated!", "success");
});
