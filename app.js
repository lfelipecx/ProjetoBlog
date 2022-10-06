//Carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
//const mongoose = require('mongoose')
const app = express()
const admin = require('./routes/admin')


//Configurações
    //Body-parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    //Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    //Mongoose

//Rotas
    app.use('/admin', admin)



//Outros
const PORT = 8081
app.listen(PORT, ()=>{
    console.log('Servidor rodando')
})