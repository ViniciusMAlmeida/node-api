const porta = 3001

const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const routes = require('./src/routes')

// Iniciando o App
const app = express()

//Iniciando o DB
mongoose.connect("mongodb://localhost:27017/nodeapi", { useNewUrlParser: true, useCreateIndex: true })
requireDir('./src/models')

// Rotas
app.use('/api', routes)

app.listen(3001, () => {
    console.log(`Servidor executando na porta ${porta}`)
})