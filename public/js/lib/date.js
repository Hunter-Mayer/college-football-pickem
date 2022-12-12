export default class Date {
	constructor(year, month, day) {
		this.year = year;
		this.month = month;
		this.day = day;
	}

	create() {
		// TODO: Create date entry in the database
	}

	getDate() {
		return { year: this.year, month: this.month, day: this.day };
	}

	toString() {
		return `${this.month}/${this.day}/${this.year}`;
	}
}
