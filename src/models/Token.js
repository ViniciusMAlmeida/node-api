const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const TokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    datger: {
        type: Date,
        required: true
    },
    datexp: {
        type: Date,
        required: true
    }
})

TokenSchema.methods = {
    exists(user) {
        const email = user.email;
        const Token = this.findOne({ email })
        console.log(Token)
        if (Token) {
            return this.token
        }
        return false
    },
    isValid(token) {
        return jwt.verify(token, process.env.JWT_KEY)
    }
}

module.exports = mongoose.model('Token', TokenSchema)