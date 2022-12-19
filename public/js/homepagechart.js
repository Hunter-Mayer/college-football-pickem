const ctx = document.getElementById("seasonScoreboard");

fetch("/api/week/weeklyScoreboard")
	.then((response) => response.json())
	.then((data) => {
		console.log(data);

		const labels = [];
		const scores = [];
		data.forEach((d) => {
			labels.push(d.user);
			const totalscore = d.picks.reduce((count, pick) => {
				return count + pick.points;
			}, 0);
			scores.push(totalscore);
		});

		new Chart(ctx, {
			type: "bar",
			data: {
				labels,
				datasets: [
					{
						label: "Weekly Total Points",
						data: scores,
						borderWidth: 1,
					},
				],
			},
			options: {
				scales: {
					y: {
						beginAtZero: true,
					},
				},
			},
		});
	})
	.catch((error) => console.log(error));
