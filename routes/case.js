//10 
const express = require('express')
//11
const router = express.Router()
//12
router.get('/case', (req,res) => res.send('case page'))
//13
module.exports = router
