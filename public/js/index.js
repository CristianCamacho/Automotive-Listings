console.log('ye')

fetch('https://www.fueleconomy.gov/ws/rest/vehicle/menu/year').then((res) => {
    return res.text()
}).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then((years) => {
    let option
    let yearSelect = document.getElementById('years')

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
    let makeSelect = document.getElementById('makes')
    console.log(document.getElementById('years').value)
    fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/make?year=${document.getElementById('years').value}`).then((res) => {
        return res.text()
    }).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then((makes) => {
        while (makeSelect.firstChild) {
            makeSelect.removeChild(makeSelect.firstChild);
        }
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
    let modelSelect = document.getElementById('models')
    console.log(document.getElementById('years').value)
    fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/menu/model?year=${document.getElementById('years').value}&make=${document.getElementById('makes').value}`).then((res) => {
        return res.text()
    }).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then((models) => {
        while (modelSelect.firstChild) {
            modelSelect.removeChild(modelSelect.firstChild);
        }
        for (let i = 0; i < models.getElementsByTagName('menuItem').length; i++) {
            option = document.createElement('OPTION')
            option.text = models.getElementsByTagName('menuItem')[i].firstChild.innerHTML
            option.value = models.getElementsByTagName('menuItem')[i].firstChild.innerHTML
            console.log(option)
            modelSelect.appendChild(option)
        }
    })
}