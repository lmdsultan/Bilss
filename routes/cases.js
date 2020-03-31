const express = require('express')
const router = express.Router()

router.get('/cases', (req,res) => res.send('cases page'))

module.exports = router