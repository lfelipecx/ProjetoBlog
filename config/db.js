if(process.env.NODE_ENV == 'production'){
    module.exports = {
        mongoURI: 'mongodb+srv://luizfelipe:lui30589@blogapp.b3i3yzc.mongodb.net/?retryWrites=true&w=majority'        
    }
}else{
    module.exports = {
        mongoURI: 'mongodb://localhost/blogapp'
    }
}