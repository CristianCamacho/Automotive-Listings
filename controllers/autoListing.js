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
        let pMin = wholeListing[0].price
        let pMax = wholeListing[0].price
        let yMin = wholeListing[0].year
        let yMax = wholeListing[0].year
        let mMin = wholeListing[0].mileage
        let mMax = wholeListing[0].mileage
        for (let i = 1; i < wholeListing.length; i++) {
            if(wholeListing[i].price > pMax){
                pMax = wholeListing[i].price
            } else if(wholeListing[i].price < pMin) {
                pMin = wholeListing[i].price
            }
            if(wholeListing[i].year > yMax){
                yMax = wholeListing[i].year
            } else if(wholeListing[i].year < yMin) {
                yMin = wholeListing[i].year
            }
            if(wholeListing[i].mileage > mMax){
                mMax = wholeListing[i].mileage
            } else if(wholeListing[i].mileage < mMin) {
                mMin = wholeListing[i].mileage
            }
        }
        if (error) {
            console.log(error)
        } else {
            res.render('index.ejs', {
                listings: wholeListing,
                logged: req.session.currentUser,
                priceMin: pMin,
                priceMax: pMax,
                yearMin: yMin,
                yearMax: yMax,
                mileMin: mMin,
                mileMax: mMax
            })
        }
    })
})

router.post('/filtered', (req, res) => {
    console.log(req.body)
    res.redirect('/al')
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
    if (req.session.currentUser) {
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
            if (req.session.currentUser) {
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
    let username
    Auto.findById(req.params.id, (error, foundAuto) => {
        if (error) {
            console.log(error)
        } else {
            if (req.session.currentUser) {
                logged = true
                username = req.session.currentUser.username
            } else {
                logged = false
                username = ''
            }
            res.render('show.ejs', {
                auto: foundAuto,
                logged: logged,
                username: username
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