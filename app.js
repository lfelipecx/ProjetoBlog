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
require('./models/Postagem')
const Postagem = mongoose.model('postagens')
require('./models/Categoria')
const Categoria = mongoose.model('categorias')
const usuarios = require('./routes/usuario')
const moment = require('moment')
const passport = require('passport')
require('./config/auth')(passport)
const db = require('./config/db')
//const {eAdmin} = require('./helpers/eAdmin')






//Configurações
    //Sessão
    app.use(session({
        secret: "cursodenode",
        resave: true,
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())
    //Middleware criando variaveis globais
    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        res.locals.error = req.flash('error')
        res.locals.user = req.user || null
        //res.locals.admin = eAdmin || null
        next()
    })
    //Body-parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
    //Handlebars
    app.engine('handlebars', handlebars.engine({
        defaultLayout: 'main',
        helpers: {
            formatDate: (date) => {
                return moment(date).format('DD/MM/YYYY - HH:MM')
            }
        }
    }))
    app.set('view engine', 'handlebars')
    //Mongoose
    mongoose.connect(db.mongoURI).then(() => {
        console.log('MongoDB conectado com sucesso')
    }).catch((erro) => {
        console.log("Falha ao conectar o MongoDB. " + erro)
    })
    //Public
    app.use(express.static(path.join('public/css')))

//Rotas
    app.get('/', (req, res) => {        

        Postagem.find().lean().populate('categoria').sort({data: 'desc'}).then((postagens) => {
            res.render('index', {postagens: postagens})
        }).catch((erro) => {
            req.flash('error_msg','Houve um erro ao listar as postagens')
            res.redirect('/404')
        })        
    })

    app.get('/postagem/:slug', (req, res) => {
        Postagem.findOne({slug: req.params.slug}).lean().then((postagem) => {
            if(postagem){
                res.render('postagem/index', {postagem: postagem})
            }else{
                req.flash('error_msg', 'Essa postagem não existe')
                res.redirect('/')
            }
        }).catch((error) => {
            req.flash('error_msg', 'Houve um erro ao listar postagens')
            res.redirect('/')
        })
    })

    app.get('/categorias', (req, res) => {
        Categoria.find().lean().then((categorias) => {
            res.render('categorias/index', {categorias: categorias})
        }).catch((erro) => {
            req.flash('error_msg', 'Erro ao listar categorias')
            res.redirect('/')
        })
    })

    app.get('/categorias/:slug', (req, res) => {
        Categoria.findOne({slug: req.params.slug}).lean().then((categoria) => {
            if(categoria){

                Postagem.find({categoria: categoria._id}).lean().then((postagens) =>{
                    res.render('categorias/postagens', {postagens: postagens, categoria: categoria})
                }).catch((error) => {
                    req.flash('error_msg', 'Erro ao listar postagens da categoria')
                    res.redirect('/categorias')
                })
                
            }else{
                req.flash('error_msg', 'Erro ao listar postagens da categoria')
                res.redirect('/categorias')
            }            
        }).catch((error) => {
            req.flash('error_msg', 'Erro ao listar postagens da categoria')
            res.redirect('/categorias')
        })
    })

    app.get('/404', (req, res) => {
        res.render('error 404')
    })

    app.use('/admin', admin)
    app.use('/usuarios', usuarios)



//Outros
const PORT = process.env.PORT || 8081
app.listen(PORT, ()=>{
    console.log('Servidor rodando na porta 8081')
})