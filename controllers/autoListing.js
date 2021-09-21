const express = require('express')
const router = express.Router()

const Auto = require('../models/auto')

router.get('/', (req, res) => {
    // res.render('index.ejs')
    res.send('test')
})

module.exports = router