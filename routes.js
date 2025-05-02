// import the express
const express=require('express')
// import usercontroller
const userContoller=require('./controllers/userController')

//create the instance for the class routes
const route= new express.Router()

//path for register function 
route.post('/register',userContoller.registerController)

// export route 
module.exports=route