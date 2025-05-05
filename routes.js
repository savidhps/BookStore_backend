// import the express
const express=require('express')
// import usercontroller
const userController=require('./controllers/userController')

//create the instance for the class routes
const route= new express.Router()

//path for register function 
route.post('/register',userController.registerController)

//path to Login
route.post('/login',userController.loginController)

// export route 
module.exports=route