//10 
const express = require('express')
//11
const router = express.Router()
//12
router.get('/menu', (req,res) => res.send('menu page'))
//13
module.exports = router
