const mongoose = require('mongoose')
const { Schema, model} = mongoose

const autoSchema = new Schema({
    year: {type: Number, require: true},
    make: {tpye: String, require: true},
    model: {tpye: String, require: true},
    mileage: {type: Number, reqired: true},
    price: {type: Number},
    trim: {tpye: String},
    body: {tpye: String},
    cylinders: {type: Number},
    doorCount: {type: Number},
    autoTrans: {type: Boolean}
})

const Auto = model('Auto', autoSchema)

module.exports = Auto