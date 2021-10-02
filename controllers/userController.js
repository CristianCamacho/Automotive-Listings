const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

const User = require('../models/users')

router.get('/register', (req, res) => {
    res.render('registration.ejs', {
        logged: req.session.currentUser
    })
})

router.post('/register', (req, res) => {
    if (req.body.password != req.body.verifyPassword) {
        res.redirect('/user/register')
    }
    const salt = bcrypt.genSaltSync(10)
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    User.findOne({ username: req.body.username }, (error, foundOne) => {
        if (foundOne) {
            res.redirect('/user/register')
        } else {
            User.create(req.body, (error, createdUser) => {
                res.redirect('/al')
            })
        }
    })
})

router.get('/signin', (req, res) => {
    res.render('signin.ejs', {
        logged: req.session.currentUser
    })
})

router.post('/signin', (req, res) => {
    User.findOne({ username: req.body.username }, (error, foundUser) => {
        if (foundUser) {
            const validLogin = bcrypt.compareSync(req.body.password, foundUser.password)
            if (validLogin) {
                req.session.currentUser = foundUser
                res.redirect('/al')
            }
        } else {
            res.redirect('/user/signin')
        }
    })
})

router.get('/signout', (req, res) => {
    console.log(req.session.currentUser)
    req.session.destroy((error) => {
        if (error) {
            console.log(error)
            res.redirect('al')
        }
    })
    res.redirect('/al')
})

module.exports = router