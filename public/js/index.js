let yearSelect = document.getElementById('year')
let makeSelect = document.getElementById('make')
let modelSelect = document.getElementById('model')
let optionSelect = document.getElementById('option')
let audoIDSelect = document.getElementById('autoID')

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

const clearOptionSelect = () => {
    while (optionSelect.firstChild) {
        optionSelect.removeChild(optionSelect.firstChild);
    }
    let option = document.createElement('OPTION')
    option.text = 'Select Option'
    option.value = 'none'
    optionSelect.appendChild(option)
}

fetch('https://www.fueleconomy.gov/ws/rest/vehicle/menu/year').then((res) => {
    return res.text()
}).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then((year) => {
    clearMakeSelect()
    clearModelSelect()
    clearOptionSelect()
    let option
    for (let i = 0; i < year.getElementsByTagName('menuItem').length; i++) {
        option = document.createElement('OPTION')
        option.text = year.getElementsByTagName('menuItem')[i].firstChild.innerHTML
        option.value = year.getElementsByTagName('menuItem')[i].firstChild.innerHTML
        yearSelect.appendChild(option)
    }
})

const generateMakeOptions = () => {
    let option
    fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${yearSelect.value}`).then((res) => {
        return res.text()
    }).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then((make) => {
        clearMakeSelect()
        clearModelSelect()
        clearOptionSelect()
        for (let i = 0; i < make.getElementsByTagName('menuItem').length; i++) {
            option = document.createElement('OPTION')
            option.text = make.getElementsByTagName('menuItem')[i].firstChild.innerHTML
            option.value = make.getElementsByTagName('menuItem')[i].firstChild.innerHTML
            makeSelect.appendChild(option)
        }
    })
}

const generateModelOptions = () => {
    let option
    fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${yearSelect.value}&make=${makeSelect.value}`).then((res) => {
        return res.text()
    }).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then((model) => {
        clearModelSelect()
        clearOptionSelect()
        for (let i = 0; i < model.getElementsByTagName('menuItem').length; i++) {
            option = document.createElement('OPTION')
            option.text = model.getElementsByTagName('menuItem')[i].firstChild.innerHTML
            option.value = model.getElementsByTagName('menuItem')[i].firstChild.innerHTML
            modelSelect.appendChild(option)
        }
    })
}

const generateOptionOptions = () => {
    let option
    fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${yearSelect.value}&make=${makeSelect.value}&model=${modelSelect.value}`).then((res) => {
        return res.text()
    }).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then((optionV) => {
        clearOptionSelect()
        for (let i = 0; i < optionV.getElementsByTagName('menuItem').length; i++) {
            option = document.createElement('OPTION')
            option.text = optionV.getElementsByTagName('menuItem')[i].firstChild.innerHTML
            option.value = optionV.getElementsByTagName('menuItem')[i].firstChild.innerHTML
            optionSelect.appendChild(option)
        }
    })
}

const setAutoID = () => {
    fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/options?year=${yearSelect.value}&make=${makeSelect.value}&model=${modelSelect.value}`).then((res) => {
        return res.text()
    }).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then((optionV) => {
        clearOptionSelect()
        for (let i = 0; i < optionV.getElementsByTagName('menuItem').length; i++) {
            option = document.createElement('OPTION')
            option.text = optionV.getElementsByTagName('menuItem')[i].firstChild.innerHTML
            option.value = optionV.getElementsByTagName('menuItem')[i].firstChild.innerHTML
            optionSelect.appendChild(option)
        }
    })
}