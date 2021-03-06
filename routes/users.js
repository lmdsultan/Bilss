//10
const express = require('express')
//11
const router = express.Router()
//26
const gravatar = require('gravatar')
//28 
const bcrypt = require('bcryptjs')
//32 
const jwt = require('jsonwebtoken')
//36
const config = require('config')
//17
const {check , validationResult} = require('express-validator')
//21 import user module 
const User = require('../models/User')
//12
router.post('/users',  
//18
[
    check('name', 'Name is required')
    .not()
    .isEmpty(),
    check('email', 'Please include a valide email')
    .isEmail(),
    check('password', 'Please enter a password with 4 or more chars')
    .isLength({ min: 4})
],
//19 //22
async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }
    //23
    const { name, email, password} = req.body
    //24
    try{
        //25
        let user = await User.findOne({ email })
        if (user){
           return res.status(400).json({ errors: [{ msg: 'User exists'}]})
        }
        //27
        const avatar = gravatar.url(email, {
            s: '250',
            r: 'pg',
            d: 'mm'
        })
        //27A
        user = new User({
            name,
            email,
            avatar,
            password
        })
        //29
        const salt = await bcrypt.genSalt(10)
        //30
        user.password = await bcrypt.hash(password, salt)
        //31
        await user.save()
        //33
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
module.exports = router