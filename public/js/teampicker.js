/**
 * Grab all relevant html elements to submit the picks to the server
 */
const editPicks = document.getElementById("editPick");
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const radioButtons = document.querySelectorAll('input[name="customRadio"]');
const pickCards = document.querySelectorAll('div[class="card"]');
const pickedTeams = document.querySelectorAll("input[checked]");
const pickContainers = document.getElementsByClassName("pick-container");

/**
 *
 * @param {Takes a list of html nodes and extracts its id from each node in the list} nodeList
 * @returns {A list of ids corresponding to each node id}
 */
function extractIds(nodeList) {
	let idList = [];
	for (element of nodeList) {
		idList.push(element.id);
	}
	return idList;
}

/**
 * Convert the html ids to useable ids for the server (game and team ids)
 */
const gameIds = extractIds(pickCards).map((element) =>
	element.replace("game-", "")
);
const teamIds = extractIds(radioButtons).map((element) =>
	element.replace("team-", "")
);
const pickedTeamIds = extractIds(pickedTeams).map((element) =>
	element.replace("team-", "")
);
const pickIds = extractIds(pickContainers).map((element) =>
	element.replace("pick-", "")
);

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

$(document).ready(function () {
	$("select.selectVal").change(function () {
		let selectedItem = $(this).children("option:selected").val();
		//console.log(selectedItem);
	});
});

editPicks.addEventListener("click", async (event) => {
	event.preventDefault();
	console.log(event.target);
	let points = [];
	$(document).ready(function () {
		$("option:selected").each(function () {
			points.push(this.value);
		});
	});

	console.log(points);

	for (let i = 0; i < pickIds.length; i++) {
		const apiUrl = new URL(document.location.origin + "/api/pick");
		/**
		 * Need to provide pick id, picked team id, and points
		 */
		apiUrl.searchParams.append("id", pickIds[i]);
		apiUrl.searchParams.append("team_pick_id", pickedTeamIds[i]);
		apiUrl.searchParams.append("points", points[i]);

		console.log(apiUrl);

		const response = await fetch(apiUrl, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			console.log("Picks submitted!");
		} else {
			console.error("Picks were not updated");
		}
	}

	alert("Your picks has been updated!", "success");
});
