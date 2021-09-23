const express = require('express')
const router = express.Router()

const Auto = require('../models/auto')

let testObj = [
    {
      id: ("614a6ea80851a0e1423c9c4a"),
      year: 2002,
      make: 'Lexus',
      model: 'IS300',
      mileage: 200000,
      v: 0
    },
    {
      id: ("614a6eeb8548cfe70368bfbf"),
      year: 1989,
      make: 'Ford',
      model: 'Mustang',
      mileage: 150000,
      v: 0
    },
    {
      id: ("614a6f111f9c30a05b2f0170"),
      year: 2020,
      make: 'Nissan',
      model: 'NV200',
      mileage: 156000,
      v: 0
    },
    {
      id: ("614a8692ed20a0e84bc1d891"),
      year: 2004,
      make: 'Cadillac ',
      model: 'CTS-V',
      mileage: 99000,
      v: 0
    },
    {
      id: ("614bb75da543ebe5315fa4ed"),
      year: 2003,
      make: 'Ford',
      model: 'Explorer',
      mileage: 256000,
      v: 0
    }
  ]

router.get('/', (req, res) => {
    Auto.find({}, (error, whoelListing) => {
        if (error) {
            console.log(error)
        } else {
            console.log(whoelListing)
            res.render('index.ejs', {
                listings: testObj
            })
        }
    })
})

router.get('/new', (req, res) => {
    res.render('new.ejs')
})

router.post('/new', (req, res) => {
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

module.exports = router