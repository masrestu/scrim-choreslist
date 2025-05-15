// javascript
const newItem = document.getElementById("new-chore")
const btnAdd = document.getElementById("btn-add")
const btnDel = document.getElementById("btn-del")
const errorText = document.getElementById("error-text")
const imageEl = document.getElementById("gif-image")

const choreslistEl = document.getElementById("choreslist")

const choreslist = []

function loadFromStorage() {
    const storageData = localStorage.getItem("chores") || "[]"
    choreslist.push(...JSON.parse(storageData))
    renderChores()
}

function backupToLocalStorage() {
    localStorage.setItem("chores", JSON.stringify(choreslist))
}

function clearList() {
    choreslist.length = 0
    renderChores()
}

function renderChores() {
    const itemElements = choreslist.map(choreItem => {
        const itemElement = document.createElement("button")
        itemElement.textContent = choreItem
        itemElement.className = "chore-item"
        itemElement.addEventListener("click", removeItem)
        return itemElement
    })
    const totalChoreBefore = choreslistEl.childElementCount
    const totalChoreAfter = choreslist.length
    choreslistEl.replaceChildren(...itemElements)

    errorText.className = "error-text"
    newItem.value = ""
    newItem.focus()

    if (totalChoreBefore > 0 && totalChoreAfter === 0) {
        const randomIndex = Math.floor(Math.random() * 5)
        const srcGif = `./assets/gif/${randomIndex}.gif`
        imageEl.src = srcGif
        imageEl.classList.add("show")
        setTimeout(() => {
            imageEl.classList.remove("show")
        }, 5000);
    } else {
        imageEl.classList.remove("show")
    }
    backupToLocalStorage()
}

function removeItem(event) {
    const deletedChore = event.currentTarget.textContent
    choreslist.splice(choreslist.indexOf(deletedChore), 1)
    renderChores()
}

function capitalizeFirstLetter(text) {
    const firstLetter = text[0].toUpperCase()
    const theRest = text.slice(1)
    return `${firstLetter}${theRest}`
}

function addNewItem(event) {
    event.preventDefault()
    let chore = newItem.value
    if (chore.trim() === "") {
        errorText.innerHTML = "What do you want to add? 🤔"
        errorText.classList.add("show")
        return false
    }

    chore = capitalizeFirstLetter(chore)
    if (choreslist.includes(chore)) {
        errorText.innerHTML = `${chore} already on the list! ⛔`
        errorText.classList.add("show")
        return false
    }

    choreslist.push(capitalizeFirstLetter(chore))
    renderChores()
}

document.addEventListener("DOMContentLoaded", function() {
    loadFromStorage()
    btnAdd.addEventListener("click", addNewItem)
    btnDel.addEventListener("click", clearList)
})