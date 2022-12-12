export default class Date {
	constructor(year, month, day) {
		this.year = year;
		this.month = month;
		this.day = day;
	}

	getDate() {
		return { year: this.year, month: this.month, day: this.day };
	}
}
