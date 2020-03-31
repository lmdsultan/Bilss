//37
const jwt = require('jsonwebtoken')
//38
const config = require('config')
//39
//#1
module.exports = function (req,res,next){
    const token = req.header('x-auth-token')
//#2
    if(!token){
        return res.status(401).json({ msg: 'No token'})
    }
//#3
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next()
    }
    catch(err){
        res.status(401).json({ msg: 'Token not valid'})
    }
}