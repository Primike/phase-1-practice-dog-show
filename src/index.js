let dogId

document.addEventListener('DOMContentLoaded', () => {
    fetchDogs()

    let dogForm = document.getElementById("dog-form")
    dogForm.addEventListener('submit', patchDog)
})

function fetchDogs() {
    fetch("http://localhost:3000/dogs")
        .then(function(response) {
            return response.json();
    })
        .then(function(json){
            setupTable(json)
    })
}

function setupTable(array) {
    let table = document.getElementsByClassName('margin')[4]

    for(const i of array) {
        addDog(i, table)
    }
}

function addDog(dog, table) {
    let dogRow = document.createElement('tr')

    let dogName = document.createElement('td')
    dogName.className = dog.id
    dogName.innerHTML = dog.name

    let dogBreed = document.createElement('td')
    dogBreed.className = dog.id
    dogBreed.innerHTML = dog.breed

    let dogSex = document.createElement('td')
    dogSex.className = dog.id
    dogSex.innerHTML = dog.sex 

    let editDog = document.createElement('td')
    let editButton = document.createElement('button')
    editButton.className = dog.id
    editButton.innerHTML = "Edit Dog"
    editButton.addEventListener('click', editEvent)

    table.appendChild(dogRow)

    dogRow.appendChild(dogName)
    dogRow.appendChild(dogBreed)
    dogRow.appendChild(dogSex)
    dogRow.appendChild(editDog)

    editDog.appendChild(editButton)
}

function editEvent(e) {
    let dogClass = document.getElementsByClassName(`${e.target.className}`)
    
    let formElemets = document.getElementsByTagName('input')

    formElemets[0].value = dogClass[0].innerHTML
    formElemets[1].value = dogClass[1].innerHTML
    formElemets[2].value = dogClass[2].innerHTML

    dogId = e.target.className
}

function patchDog(e) {
    e.preventDefault()

    if(dogId != true) {
        console.log(false)
        return
    }

    fetch(`http://localhost:3000/dogs/${dogId}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            name: e.target.name.value,
            breed: e.target.breed.value,
            sex: e.target.sex.value,
        }),
    })
        .then((response) => response.json())
        .then((json) => resetTable());
}

function resetTable() {
    let table = document.getElementsByClassName('margin')[4]
    let x = table.rows.length

    for(let i = 1; i < x; i++) {
        table.deleteRow(1)
    }
    fetchDogs()
}