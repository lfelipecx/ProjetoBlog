//Carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const admin = require('./routes/admin')
const path = require('path')
const session = require('express-session')
const flash = require('connect-flash')


//Configurações
    //Sessão
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))
    app.use(flash())
    //Middleware
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        next()
    })
    //Body-parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    //Handlebars
    app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
    //Mongoose
    mongoose.connect('mongodb://localhost/blogapp').then(() => {
        console.log('MongoDB conectado com sucesso')
    }).catch((erro) => {
        console.log("Falha ao conectar o MongoDB. " + erro)
    })
    //Public
    app.use(express.static(path.join('public/css')))

//Rotas
    app.use('/admin', admin)



//Outros
const PORT = 8081
app.listen(PORT, ()=>{
    console.log('Servidor rodando')
})