require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
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
mongoose.connect(process.env.DB_NAME, mongoConfig)
requireDir('./src/models')

// Rotas
app.use('/api', routes)

app.listen(process.env.PORTA, () => {
    console.log(`Servidor executando na porta ${process.env.PORTA}`)
})