export default class Team {
	constructor(name, mascot, logo) {
		this.name = name;
		this.mascot = mascot;
		// TODO: validate logo for valid URL creation to prevent accidental errors
		this.logo = new URL(logo);
	}
}
