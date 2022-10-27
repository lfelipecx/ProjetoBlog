if(process.env.NODE_ENV == 'production'){
    module.exports = {
        mongoURI: 'mongodb+srv://felipe:lui30589@cluster0.xnlqffr.mongodb.net/?retryWrites=true&w=majority'        
    }
}else{
    module.exports = {
        mongoURI: 'mongodb://localhost/blogapp'
    }
}