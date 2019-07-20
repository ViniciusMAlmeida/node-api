const porta = 3001

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const requireDir = require('require-dir')
const routes = require('./src/routes')
const mongoConfig = require('./mongoConfig')

// Iniciando o App
const app = express()
app.use(express.json())
app.use(cors())

//Iniciando o DB
mongoose.connect("mongodb://localhost:27017/nodeapi", mongoConfig)
requireDir('./src/models')

// Rotas
app.use('/api', routes)

app.listen(porta, () => {
    console.log(`Servidor executando na porta ${porta}`)
})