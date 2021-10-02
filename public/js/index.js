modelDocList = document.getElementById('model')
makeDocList = document.getElementById('make')
listingsChildren = document.getElementsByClassName('listings')[0].children


const setModels = () => {
    console.log(modelDocList)
    for(let i = 1; i < modelDocList.length; i++) {
        if(modelDocList[i].getAttribute('make') === makeDocList.value) {
            modelDocList[i].hidden = false
        } else {
            modelDocList[i].hidden = true
        }
    }
    modelDocList.value = 'none'
    modelDocList.text = 'Select Make'
}

const submitButton = () => {
    console.log(document.getElementsByClassName('listings')[0].children)
    for(let i = 0; i < listingsChildren.length; i++) {
        listingsChildren.hidden = false
    }

    for(let i = 1; i <= listingsChildren.length; i++) {
        // console.log(document.querySelector(`body > div > div.listings > div:nth-child(${[i]}) > div:nth-child(1) > p > span:nth-child(1)`).innerHTML)
        if(document.querySelector(`body > div > div.listings > div:nth-child(${[i]}) > div:nth-child(1) > p > span:nth-child(1)`).innerHTML < document.querySelector("#yearMin").value) {
            console.log(i)
            listingsChildren.hidden = true
        }
        if(document.querySelector(`body > div > div.listings > div:nth-child(${[i]}) > div:nth-child(1) > p > span:nth-child(1)`).text > document.querySelector("#yearMax").value) {
            console.log(i)
            listingsChildren.hidden = true
        }
    }
}   

document.getElementById('formButton').onclick = submitButton

