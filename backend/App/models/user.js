const mongoose = require('mongoose')
const validator = require('validator')

const { Schema } = mongoose

const userSchema = new Schema({

    name: {
        type: String,
        minlength: 4,
        required: true

    },

    phoneNumber: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return validator.isMobilePhone(value, 'en-IN', { strictMode: false })
            },
            message: function () {
                return 'Invalid phone number'
            }
        }
    },

    password: {
        type: String,
        minlength: 5,
        required: true
    }

})

const User = mongoose.model('User', userSchema)

module.exports = User