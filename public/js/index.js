console.log('ye')

let yearSelect = document.getElementById('years')
let modelSelect = document.getElementById('models')
let makeSelect = document.getElementById('makes')

const clearMakeSelect = () => {
    while (makeSelect.firstChild) {
        makeSelect.removeChild(makeSelect.firstChild);
    }
    let option = document.createElement('OPTION')
    option.text = 'Select Make'
    option.value = 'none'
    makeSelect.appendChild(option)
}

const clearModelSelect = () => {
    while (modelSelect.firstChild) {
        modelSelect.removeChild(modelSelect.firstChild);
    }
    let option = document.createElement('OPTION')
    option.text = 'Select Model'
    option.value = 'none'
    modelSelect.appendChild(option)
}

fetch('https://www.fueleconomy.gov/ws/rest/vehicle/menu/year').then((res) => {
    return res.text()
}).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then((years) => {
    clearMakeSelect()
    clearModelSelect()
    let option
    
    for (let i = 0; i < years.getElementsByTagName('menuItem').length; i++) {
        option = document.createElement('OPTION')
        option.text = years.getElementsByTagName('menuItem')[i].firstChild.innerHTML
        option.value = years.getElementsByTagName('menuItem')[i].firstChild.innerHTML
        console.log(option)
        yearSelect.appendChild(option)
    }
})

const generateMakeOptions = () => {
    let option
    console.log(document.getElementById('years').value)
    fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${document.getElementById('years').value}`).then((res) => {
        return res.text()
    }).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then((makes) => {
        clearMakeSelect()
        clearModelSelect()
        for (let i = 0; i < makes.getElementsByTagName('menuItem').length; i++) {
            option = document.createElement('OPTION')
            option.text = makes.getElementsByTagName('menuItem')[i].firstChild.innerHTML
            option.value = makes.getElementsByTagName('menuItem')[i].firstChild.innerHTML
            console.log(option)
            makeSelect.appendChild(option)
        }
    })
}

const generateModelOptions = () => {
    let option
    console.log(document.getElementById('years').value)
    fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${document.getElementById('years').value}&make=${document.getElementById('makes').value}`).then((res) => {
        return res.text()
    }).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then((models) => {
        clearModelSelect()
        for (let i = 0; i < models.getElementsByTagName('menuItem').length; i++) {
            option = document.createElement('OPTION')
            option.text = models.getElementsByTagName('menuItem')[i].firstChild.innerHTML
            option.value = models.getElementsByTagName('menuItem')[i].firstChild.innerHTML
            console.log(option)
            modelSelect.appendChild(option)
        }
    })
}