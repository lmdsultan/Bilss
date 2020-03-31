//10 
const express = require('express')
//11
const router = express.Router()
//40
const auth = require('../middleware/auth')
//28  //43
const bcrypt = require('bcryptjs')
//32   //43
const jwt = require('jsonwebtoken')
//36  //43
const config = require('config')
//17  //43
const {check , validationResult} = require('express-validator')
//42
const User = require('../models/User')
//12 //41
router.get('/auth', auth, async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password')
        res.json(user)
    } 
    catch(err){
        console.error(err.message)
        res.status(500).send('Server Error')
    }
})
router.post('/auth',  
//18
[
    check('email', 'Please include a valide email').isEmail(),
    check('password', 'Please enter a password').exists()
],
//19 //22
async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    //23
    const {email, password} = req.body
    //24
    try{
        //25
        let user = await User.findOne({ email })
        if (!user){
           return res.status(400).json({ errors: [{ msg: 'Invalied entry'}]})
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            return res.status(400).json({ errors: [{ msg: 'Invalied entry'}]})
        }
        const payload = {
            user: {
                id: user.id
            }
        }
        //34
        jwt.sign(
            payload,
            config.get('jwtSecret'),
            {expiresIn: 360000},
            (err, token) => {
                if (err) throw err
                res.json({ token })
            }
        )
    }
    catch(err){
        console.log(err.message)
        res.status(500).send('Server Error')
    }
}) 
//13
module.exports = router
