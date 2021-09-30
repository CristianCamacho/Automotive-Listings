require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT
const mongoURI = process.env.MONGOURI
const SESSION_SECRET = process.env.SESSION_SECRET
const session = require('express-session')

const alController = require('./controllers/autoListing')
const userController = require('./controllers/userController')

const mongoose = require('mongoose')
const methodOverride = require("method-override")
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
app.use('/public', express.static('public'));
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false
    })
)

app.use('/al', alController)
app.use('/user', userController)

app.listen(PORT, () => {
    console.log(`Listening on PORT:${PORT}`)
})