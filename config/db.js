if(process.env.NODE_ENV == 'production'){
    module.exports = {
        mongoURI: '179.214.14.232/32'        
    }
}else{
    module.exports = {mongoURI: 'mongodb://localhost/blogapp'}
}