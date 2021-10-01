const mongoose = require('mongoose')
const { Schema, model } = mongoose

const autoSchema = new Schema({
    year: { type: Number, required: true },
    make: { type: String, required: true },
    model: { type: String, required: true },
    option: { type: String, reqired: true },
    autoID: { type: String, reqired: true },
    mileage: { type: Number, reqired: true },
    img: { type: String, default: '../public/images/car-310650_1280.png' },
    price: { type: Number },
    posterUserName: { type: String, reqired: true },
    posterEmail: { type: String, required: true },
    location: { type: String, required: true }
})

const Auto = model('Auto', autoSchema)

module.exports = Auto