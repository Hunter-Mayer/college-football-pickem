fetch("/api/week/weeklyScoreboard")
    .then((response)=>response.json())
    .then((data)=>console.log(data))
    .catch((error)=>console.log(error))
