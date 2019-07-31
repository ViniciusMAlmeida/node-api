const User = require('../models/User')
const Token = require('../models/Token')
const jwt = require("jsonwebtoken")

module.exports = {
    async register(req, res) {
        const { email } = req.body

        try {
            if (await User.findOne({ email })) {
                return res.status(400).json({ error: "User already exists" })
            }

            const user = await User.create(req.body)

            return res.json({ user })
        } catch (err) {
            return res.status(400).json({ error: "User registration failed" })
        }
    },

    async authenticate(req, res) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email })

            if (!user) {
                return res.status(400).json({ error: "User not found" })
            }

            if (!(await user.compareHash(password))) {
                return res.status(400).json({ error: "Invalid password" })
            }

            const tokenModel = await Token.findOne({ email })
            if (tokenModel && tokenModel.isValid(tokenModel.token || '')) {
                return res.json({
                    user,
                    token: tokenModel.token
                })
            }

            const token = user.generateToken()
            const iat = new Date(jwt.decode(token).iat * 1000)
            const exp = new Date(jwt.decode(token).exp * 1000)
            await Token.findOneAndRemove({ email })
            await Token.create({ token: token, name: user.name, email: user.email, datger: iat, datexp: exp })

            return res.json({
                user,
                token: token
            })
        } catch (err) {
            return res.status(400).json({ error: "User authentication failed" })
        }
    },

    async me(req, res) {
        try {
            const { userId } = req

            const user = await User.findById(userId)

            return res.json({ user })
        } catch (err) {
            return res.status(400).json({ error: "Can't get user information" })
        }
    }
}