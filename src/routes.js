const express = require('express')
const routes = express.Router()
const authMiddleware = require('./middlewares/auth')
const UserController = require('./controllers/UserController')
const ProductController = require('./controllers/ProductController')

routes.post('/user/register', UserController.register)
routes.post('/user/authenticate', UserController.authenticate)
routes.get('/user/me', authMiddleware, UserController.me)

routes.get('/products', authMiddleware, ProductController.index)
routes.get('/products/:id', authMiddleware, ProductController.show)
routes.post('/products', authMiddleware, ProductController.store)
routes.put('/products/:id', authMiddleware, ProductController.update)
routes.delete('/products/:id', authMiddleware, ProductController.destroy)

module.exports = routes