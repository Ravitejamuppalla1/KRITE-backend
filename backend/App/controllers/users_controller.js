const User = require('../models/user')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userCtlr = {}

userCtlr.register = async (req, res) => {

    try {

        const { body } = req
        const newUser = await User.create(body)
        const saltvalue = await bcryptjs.genSalt()
        const hashvalue = await bcryptjs.hash(newUser.password, saltvalue)
        newUser.password = hashvalue
        const userData = await newUser.save()
        res.json(userData)

    }

    catch (error) {
       res.json(error)
    }
}


userCtlr.login = async (req, res) => {

    try {

        const { body } = req

        let userData
        userData = await User.findOne({ phoneNumber: body.phoneNumber })

        if (!userData) {
            res.json({
                errors: "Invalid phonenumber or password"
            })
        }
        else {

            const verifypassword = await bcryptjs.compare(body.password, userData.password)
            if (verifypassword) {
                const tokenData = {
                    id: userData._id,
                    name: userData.name
                }
                const jwttoken = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' })
                res.json({
                    token: `Bearer ${jwttoken}`
                })
            }
            else {

                res.json({
                    errors: "Invalid phoneNumber or password"
                })
            }
        }
    }

    catch (error) {
        console.log(error)
    }
}

module.exports = userCtlr