const express = require('express')
const router = express.Router()

const Auto = require('../models/auto')
const seedAuto = require('../seed/seed')

const authRequired = (req, res, next) => {
    if (req.session.currentUser) {
        next()
    } else {
        res.redirect(`/al`)
    }
}

router.get('/', (req, res) => {
    Auto.find({}, (error, wholeListing) => {
        if (error) {
            console.log(error)
        } else {

            res.render('index.ejs', {
                listings: wholeListing,
                logged: req.session.currentUser
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

router.get('/new', authRequired, (req, res) => {
    let logged
    if(req.session.currentUser){
        logged = true
    } else {
        logged = false
    }
    res.render('new.ejs', {
        logged: logged
    })
})

router.post('/new', authRequired, (req, res) => {
    req.body.posterUserName = req.session.currentUser.username
    req.body.location = req.session.currentUser.location
    req.body.posterEmail = req.session.currentUser.email
    if (req.body.img === '') {
        req.body.img = undefined
    }
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

router.get('/edit/:id', authRequired, (req, res) => {
    let logged
    Auto.findById(req.params.id, (error, foundAuto) => {
        if (error) {
            console.log(error)
        } else {
            if(req.session.currentUser){
                logged = true
            } else {
                logged = false
            }
            res.render('edit.ejs', {
                auto: foundAuto,
                logged: logged
            })
        }
    })
})

router.put('/edit/:id', authRequired, (req, res) => {
    Auto.findById(req.params.id, (error, found) => {
        if (found.posterUserName === req.session.currentUser.username) {
            Auto.findByIdAndUpdate(req.params.id, req.body, (error, updated) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(updated)
                }
                res.redirect('/al')
            })
        }
    })
})

router.get('/show/:id', (req, res) => {
    let logged
    Auto.findById(req.params.id, (error, foundAuto) => {
        if (error) {
            console.log(error)
        } else {
            if(req.session.currentUser){
                logged = true
            } else {
                logged = false
            }
            res.render('show.ejs', {
                auto: foundAuto,
                logged: logged
            })
        }
    })
})

router.delete('/delete/:id', (req, res) => {
    Auto.findById(req.params.id, (error, found) => {
        if (found.posterUserName === req.session.currentUser.username) {
            Auto.findByIdAndDelete(req.params.id, (error, deleted) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log(deleted)
                }
            })
        }
    })
    res.redirect('/al')
})

module.exports = router