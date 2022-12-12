export default class Date {
	dateDatabaseURL = new URL("/api/dates");

	constructor(year, month, day) {
		this.year = year;
		this.month = month;
		this.day = day;

		this.id = null;
	}

	async create() {
		// TODO: Create date entry in the database
		const res = await fetch(this.dateDatabaseURL, {
			method: "POST",
			body: JSON.stringify(this.getDate()),
			headers: { "Content-Type": "application/json" },
		});

		if (res.ok) {
			this.id = res.id;
		} else {
			alert("Failed to create date!");
		}
	}

	getDate() {
		return { year: this.year, month: this.month, day: this.day };
	}

	toString() {
		return `${this.month}/${this.day}/${this.year}`;
	}
}
