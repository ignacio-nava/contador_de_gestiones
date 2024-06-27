// ///////////////////////////// CONSTANTES /////////////////////////////
const counterItems = document.querySelectorAll(".counter-item")

const OBJECT_KEY = "Status"
const OBJECT_VALUE = {
    newClients: { value: 0, title: "Nuevos" },
    followClients: { value: 0, title: "Seguidos" }
}

// ///////////////////////////// FUNCIONES //////////////////////////////
function createStatus() {
    let statusPointer = JSON.parse(localStorage.getItem(OBJECT_KEY))

    if (statusPointer) return statusPointer

    statusPointer = {...OBJECT_VALUE}
    localStorage.setItem(OBJECT_KEY, JSON.stringify(statusPointer))
    return statusPointer
}

function updateStatus(element, innerHTML) {
    localStorage.setItem(OBJECT_KEY, JSON.stringify(Status))
    element.innerHTML = innerHTML
}

function build() {
    Object.keys(Status).forEach((key, i) => {
        const counterItem =  counterItems[i]
        counterItem.dataset.key = key
        
        const addButton = counterItem.querySelector(".info-add__button")
        const countDisplay = addButton.children[0]
        updateStatus(countDisplay, Status[key].value)
        addButton.addEventListener("click", e => {
            Status[key].value += 1
            updateStatus(countDisplay, Status[key].value)
        })

        const subButton = counterItem.querySelector(".sub-button")
        subButton.addEventListener("click", e => {
            if (Status[key].value < 1) return
            Status[key].value -= 1
            updateStatus(countDisplay, Status[key].value)
        })

        const restartButton = counterItem.querySelector(".restart-button")
        restartButton.addEventListener("click", e => {
            const restart = window.confirm(
                `¿Desea reiniciar la cuenta para los Clientes ${Status[key].title}?`
            )
            if (!restart) return
            Status[key].value = 0
            updateStatus(countDisplay, Status[key].value)
        })
    })
}

// //////////////////////////// INICIADORES /////////////////////////////
const Status = createStatus()
build()