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
	let goodPicks = [];
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

		for (const form of pickedTeamForms[i]) {
			console.log(form);
			// for (const inputElement of form) {
			// 	if (inputElement.checked) {
			// 		console.log(inputElement);
			// 	}
			// }
		}
		//picks[i].pickedTeamId;
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

	/**
	 * If a partial list of picks were updated, warn the user that they submitted an incomplete form
	 */
	if (goodPicks.length === 0) {
		return null;
	} else if (goodPicks.length < pickContainers.length) {
		return false;
	} else {
		return true;
	}
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
	let updateStatus = updateFormSelectionData();
	if (updateStatus === null) {
		alert(
			"You must select at least one team to update your picks",
			"danger"
		);
		return;
	} else if (!updateStatus) {
		alert(
			" Not all picks were updated. Resubmit when all picks are updated.",
			"warning"
		);
	}

	const apiUrl = new URL(document.location.origin + "/api/pick");

	for (let i = 0; i < pickIds.length; i++) {
		/**
		 * Need to provide
		 * pick id
		 * game id
		 * picked team id
		 * points
		 */
		apiUrl.searchParams.set("id", pickIds[i]);
		apiUrl.searchParams.set("game_id", gameIds[i]);
		apiUrl.searchParams.set("team_pick_id", pickedTeamIds[i]);
		apiUrl.searchParams.set("points", points[i]);
		console.log(apiUrl);
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

	alert("Your picks have been updated!", "success");
});
