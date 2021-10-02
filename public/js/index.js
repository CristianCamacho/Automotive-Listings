modelDocList = document.getElementById('model')
makeDocList = document.getElementById('make')
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