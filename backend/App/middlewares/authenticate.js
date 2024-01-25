const jwt = require('jsonwebtoken')
require('dotenv').config()

const userAuthenticate = (req,res,next)=>{

    const token = req.header('authorization').split(' ')[1]
    const verifytoken = jwt.verify(token,process.env.SECRET_KEY)
    if(verifytoken){
        const userData = {
            id:verifytoken.id,
            name:verifytoken.name
        }
        req.user = userData
        next()

    }
    else {
        res.json({
            errors:"Invalid Token"
        })
    }
}

module.exports = userAuthenticate