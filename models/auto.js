const mongoose = require('mongoose')
const { Schema, model} = mongoose

const autoSchema = new Schema({
    year: {type: Number, required: true},
    make: {type: String, required: true},
    model: {type: String, required: true},
    mileage: {type: Number, reqired: true},
    img: { type: String, default: 'http://localhost:3000/public/images/car-310650_1280.png' },
    price: {type: Number},
    trim: {type: String},
    body: {type: String},
    cylinders: {type: Number},
    doorCount: {type: Number},
    autoTrans: {type: Boolean}
})

const Auto = model('Auto', autoSchema)

module.exports = Auto