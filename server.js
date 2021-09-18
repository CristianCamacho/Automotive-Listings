require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT

const mongoose = require('mongoose')
const methodOverride = require("method-override")

const mongoURI = "mongodb://127.0.0.1:27017/autolistings"
const db = mongoose.connection

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('database connected')
})

db.on('error', (err) => { console.log('ERROR: ', err) })
db.on('connected', () => { console.log('mongo connected') })
db.on('disconnected', () => { console.log('mongo disconnected') })

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.listen(PORT, () => {
    console.log(`Listening on PORT:${PORT}`)
})