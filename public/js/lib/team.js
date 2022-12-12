export default class Team {
	baseURL = "/api/team";
	teamDatabaseURL = new URL(baseURL);

	constructor(name, mascot, logo, id = null) {
		this.name = name;
		this.mascot = mascot;
		// TODO: validate logo for valid URL creation to prevent accidental errors
		this.logo = logo;
		this.logoURL = new URL(logo);
		this.id = id;
	}

	async create() {
		const res = await fetch(this.teamDatabaseURL, {
			method: "POST",
			body: JSON.stringify(this.getJSON()),
			headers: { "Content-Type": "application/json" },
		});

		if (res.ok) {
			this.id = res.id;
		} else {
			alert("Failed to create Team");
		}

		this.resetURL();
		return res;
	}

	async get() {
		this.teamDatabaseURL.pathname += `/${this.id}`;
		const res = (await fetch(this.teamDatabaseURL)).json();

		this.id = res.id;
		this.name = res.name;
		this.mascot = res.mascot;
		this.logo = res.logo;
		this.logoURL = new URL(this.logo);

		this.resetURL();
		return res;
	}

	getJSON() {
		return { name: this.name, mascot: this.mascot, logo: this.logo };
	}

	resetURL() {
		this.teamDatabaseURL = new URL(baseURL);
	}
}
