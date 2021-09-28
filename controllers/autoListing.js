const express = require('express')
const router = express.Router()

const Auto = require('../models/auto')
const seedAuto = require('../seed/seed')

router.get('/', (req, res) => {
    Auto.find({}, (error, wholeListing) => {
        if (error) {
            console.log(error)
        } else {
            console.log(wholeListing)
            res.render('index.ejs', {
                listings: wholeListing
            })
        }
    })
})

router.get('/seed', (req, res) => {
    Auto.create(seedAuto, (error, seeded) => {
        if(error) {
            console.log(error)
        } else {
            console.log(seeded)
        }
        res.redirect('/al')
    })
})

router.get('/new', (req, res) => {
    res.render('new.ejs')
})

router.post('/new', (req, res) => {
    console.log(req.body)
    Auto.create(req.body, (error, newAuto) => {
        if (error) {
            console.log(error)
        } else {
            console.log(newAuto)
        }
        res.redirect('/al')
    })
})

router.get('/:id', (req, res) => {
    Auto.findById(req.params.id, (error, foundAuto) => {
        if (error) {
            console.log(error)
        } else {
            console.log(foundAuto)
            res.render('show.ejs', {
                auto: foundAuto
            })
        }
    })
})

router.get('/edit/:id', (req, res) => {
    Auto.findById(req.params.id, (error, foundAuto) => {
        if (error) {
            console.log(error)
        } else {
            console.log(foundAuto)
            res.render('edit.ejs', {
                listing: foundAuto
            })
        }
    })
})

router.put('/edit/:id', (req, res) => {
    Auto.findByIdAndUpdate(req.params.id, req.body, (error, updated) => {
        if (error) {
            console.log(error)
        } else {
            console.log(updated)
        }
        res.redirect('/al')
    })
})

router.get('/show/:id', (req, res) => {
    Auto.findById(req.params.id, (error, foundAuto) => {
        if (error) {
            console.log(error)
        } else {
            console.log(foundAuto)
            res.render('show.ejs', {
                auto: foundAuto
            })
        }
    })
})

router.delete('/delete/:id', (req,res) => {
    Auto.findByIdAndDelete(req.params.id, (error, deleted) => {
        if(error) {
            console.log(error) 
        } else {
            console.log(deleted)
        }
    })
    res.redirect('/al')
})

module.exports = router