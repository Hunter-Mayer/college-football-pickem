const logout = async () => {
	const response = await fetch("/api/users/logout", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	});

	if (response.ok) {
		location.reload();
	} else {
		alert(response.statusText);
	}
};

document.querySelector("#logout").addEventListener("click", logout);
