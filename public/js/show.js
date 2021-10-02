

fetch(`https://www.fueleconomy.gov/ws/rest/vehicle/${document.currentScript.getAttribute('EPAID')}`).then((res) => {
    return res.text()
}).then(str => (new window.DOMParser()).parseFromString(str, "text/xml")).then((data) => {
    document.getElementById('city').innerHTML = 'City MPG: ' + data.getElementsByTagName('vehicle')[0].getElementsByTagName('city08')[0].innerHTML

    document.getElementById('highway').innerHTML = 'Highway MPG: ' + data.getElementsByTagName('vehicle')[0].getElementsByTagName('highway08')[0].innerHTML

    document.getElementById('combined').innerHTML = 'Combined MPG: ' + data.getElementsByTagName('vehicle')[0].getElementsByTagName('comb08')[0].innerHTML

    document.getElementById('fuelType').innerHTML = 'Fuel Type: ' + data.getElementsByTagName('vehicle')[0].getElementsByTagName('fuelType1')[0].innerHTML

    document.getElementById('cylinders').innerHTML = 'Cylinders: ' + data.getElementsByTagName('vehicle')[0].getElementsByTagName('cylinders')[0].innerHTML

    document.getElementById('displace').innerHTML = 'Engien Displaycement: ' + data.getElementsByTagName('vehicle')[0].getElementsByTagName('displ')[0].innerHTML + 'L'

    document.getElementById('drive').innerHTML = 'Drive: ' + data.getElementsByTagName('vehicle')[0].getElementsByTagName('drive')[0].innerHTML

    document.getElementById('gear').innerHTML = 'Transmission: ' + data.getElementsByTagName('vehicle')[0].getElementsByTagName('trany')[0].innerHTML
})