// import dotenv 
require('dotenv').config()//config to load the envourment variable

// import express liberary 
const express=require('express')
// importing cors  -for communating btw forntend
const cors = require('cors')
//import routes
const route=require('./routes')

// import db connection file
require('./databaseconnection')

// create the server using express
const bookstoreServer=express() 

//server using cors --------all the tep must step by step
bookstoreServer.use(cors())
// creating a middleware -to use with breaking request responce cycle(parse Json)
bookstoreServer.use(express.json())
//use routes
bookstoreServer.use(route)

//export the upload folder from the server
bookstoreServer.use('/upload',express.static('./uploads'))

//upload pdf folder for the server
bookstoreServer.use('/pdfUploads',express.static('./pdfUploads'))



//create port

PORT=4100||process.env.PORT

bookstoreServer.listen(PORT,()=>{
    console.log('Server running sucessfully 4100');
    
})