export default class Date {
	baseURL = "/api/date";
	dateDatabaseURL = new URL(baseURL);

	constructor(year, month, day, id = null) {
		this.year = year;
		this.month = month;
		this.day = day;
		this.id = id;
	}

	async create() {
		const res = await fetch(this.dateDatabaseURL, {
			method: "POST",
			body: JSON.stringify(this.getJSON()),
			headers: { "Content-Type": "application/json" },
		});

		if (res.ok) {
			this.id = res.id;
		} else {
			alert("Failed to create date!");
		}

		this.resetURL();
		return res;
	}

	// Fetch defaults to get request
	async get() {
		this.dateDatabaseURL.pathname += `/${this.id}`;
		const res = (await fetch(this.dateDatabaseURL)).json();

		this.id = res.id;
		this.year = res.year;
		this.month = res.month;
		this.day = res.day;

		this.resetURL();
		return res;
	}

	getJSON() {
		return { year: this.year, month: this.month, day: this.day };
	}

	toString() {
		return `${this.month}/${this.day}/${this.year}`;
	}

	resetURL() {
		this.dateDatabaseURL = new URL(baseURL);
	}
}
