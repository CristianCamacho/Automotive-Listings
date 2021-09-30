const express = require('express')
const router = express.Router()

const Auto = require('../models/auto')
const seedAuto = require('../seed/seed')

const authRequired = (req, res, next) => {
    if (req.session.currentUser) {
        console.log(req.session.currentUser)
        next()
    } else {
        res.redirect('/al', {
            altert: true,
            alertMsg: 'Pleaase sign in.'
        })
    }
}

router.get('/', (req, res) => {
    Auto.find({}, (error, wholeListing) => {
        console.log(req.session.currentUser)
        if (error) {
            console.log(error)
        } else {
            res.render('index.ejs', {
                listings: wholeListing
            })
        }
    })
})

router.get('/seed', (req, res) => {
    Auto.create(seedAuto, (error, seeded) => {
        if (error) {
            console.log(error)
        } else {
            console.log(seeded)
        }
        res.redirect('/al')
    })
})

router.get('/new',authRequired, (req, res) => {
    res.render('new.ejs')
})

router.post('/new', authRequired, (req, res) => {
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

router.get('/edit/:id', authRequired, (req, res) => {
    Auto.findById(req.params.id, (error, foundAuto) => {
        if (error) {
            console.log(error)
        } else {
            console.log(foundAuto)
            res.render('edit.ejs', {
                auto: foundAuto
            })
        }
    })
})

router.put('/edit/:id',authRequired, (req, res) => {
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

router.delete('/delete/:id', (req, res) => {
    Auto.findByIdAndDelete(req.params.id, (error, deleted) => {
        if (error) {
            console.log(error)
        } else {
            console.log(deleted)
        }
    })
    res.redirect('/al')
})

module.exports = router