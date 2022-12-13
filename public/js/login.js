const loginFormHandler = async (event) => {
	event.preventDefault();

	const email = document.querySelector("#email-login").value.trim();
	const password = document.querySelector("#password-login").value.trim();

	if (email && password) {
		const response = await fetch("/api/users/login", {
			method: "POST",
			body: JSON.stringify({ email, password }),
			headers: { "Content-Type": "application/json" },
		});

		if (response.ok) {
			document.location.replace("/");
		} else {
			alert("Failed to log in");
		}
	}
};
document
	.querySelector("#login-form")
	.addEventListener("submit", loginFormHandler);




const signupFormHandler = async (event) => {
	event.preventDefault();

	const name = document.querySelector("#name-signup").value.trim();
	const email = document.querySelector("#email-signup").value.trim();
	const password = document.querySelector("#password-signup").value.trim();
	const confirmPassword = document.querySelector("#confirmPassword-signup").value.trim();

	console.log (name, email, password, confirmPassword)
	if (email && password) {
		const response = await fetch("/api/users/signup", {
			method: "POST",
			body: JSON.stringify({ name, email, password }),
			headers: { "Content-Type": "application/json" },
		});
		const userData = (await response.json())
		console.log(userData)
		if (response.ok) {
			document.location.replace("/");
		} else {
			alert("Failed to sign up");
		}
	}
};

document
	.querySelector("#signup-form")
	.addEventListener("submit", signupFormHandler);

