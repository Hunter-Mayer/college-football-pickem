let userId;
let pickIds = [];
let gameIds = [];
let pickedTeamIds = [];
let points = [];

const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const editPicks = document.getElementById("editPick");

function extractIds(containerCollection, stringToReplace) {
	const idList = [];
	for (const container of containerCollection) {
		idList.push(container.id.replace(stringToReplace, ""));
	}
	return idList;
}

function updatePicks() {
	let pickContainers = document.getElementsByClassName("pick-container");
	pickIds = extractIds(pickContainers, "pick-");
}

function updateGames() {
	let gameContainers = document.getElementsByClassName("game-container");
	gameIds = extractIds(gameContainers, "game-");
}

function updatePickedTeams() {
	let pickedTeamForms = document.getElementsByClassName("team-picker-form");
	for (const form of pickedTeamForms) {
		console.log(form);
	}
}

function updatePoints() {
	let pointContainers = document.getElementsByClassName("pick-points");
	for (const container of pointContainers) {
		for (const option of container) {
			if (option.selected) {
				points.push(option.value);
			}
		}
	}
}

function updateFormSelectionData() {
	updatePicks();
	updatePoints();
	updateGames();
	updatePickedTeams();
	console.log(pickIds);
	console.log(gameIds);
	console.log(pickedTeamIds);
	console.log(points);
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
	updateFormSelectionData();

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

	alert("Your picks has been updated!", "success");
});
