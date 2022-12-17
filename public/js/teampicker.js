const editPicks = document.getElementById("editPick")
const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const radioButtons = document.querySelectorAll('input[name="customRadio"]')
const pointSelections = document.querySelectorAll('option[selected]')
const pickCards = document.querySelectorAll('div[class="card"]')

const pickedTeams = document.querySelectorAll('input[checked]')

// Prints all pick ids
for (const pickCard of pickCards) {
    console.log(pickCard.id)
}

// for (const radioButton of radioButtons) {
//     radioButton.addEventListener("change", showSelected);
// }

// function showSelected(e) {
//     if (this.checked) {
//         console.log(this.id)
//     }
// }

for (const radioButton of radioButtons) {
    if (radioButton.checked) {
        console.log(radioButton.id)
    }
}


// Prints all point selections
for (const pointSelection of pointSelections) {
    console.log(pointSelection.innerHTML)
}

const alert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}

if (editPicks) {
  editPicks.addEventListener('click', () => {
    alert('Your pick has been updated!', 'success')
  })
}



editPicks.addEventListener("click", (event) => {
    event.preventDefault();
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            console.log(radioButton.id)
        }
    }
})



// editPicks.addEventListener("submit", (event) => {
//     event.preventDefault();

//     //const id = 

//     if (event.submitter.innerHTML === "Submit") {
//         fetch("/api/pick", {
//             method: "PUT",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify({id, team_pick_id, points})
//         })
//         .then(response => {
//             if (response.status === 200) {
                
//             }
//         })
//     }
// })