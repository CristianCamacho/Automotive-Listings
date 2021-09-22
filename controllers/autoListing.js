const express = require('express')
const router = express.Router()

const Auto = require('../models/auto')

router.get('/', (req, res) => {
    Auto.find({}, (error, wholeListing) => {
        if(error) {
            console.log(error)
        } else {
            res.render('index.ejs', {
                listings: wholeListing
            })
        }
    })
})

router.get('/new', (req, res) => {
    res.render('new.ejs')
})

router.post('/new', (req, res) => {
    Auto.create(req.body, (error, newAuto) => {
        if(error) {
            console.log(error)
        } else {
            console.log(newAuto)
        }
        res.redirect('/al')
    })
})

module.exports = router