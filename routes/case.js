const express = require('express')
const router = express.Router()

router.get('/case', (req,res) => res.send('case page'))

module.exports = router