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
    isValid(token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            if (decoded) {
                return true
            }
        } catch (error) {
            return false
        }
    }
}

module.exports = mongoose.model('Token', TokenSchema)