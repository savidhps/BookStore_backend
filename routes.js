// import the express
const express=require('express')
// import usercontroller
const userController=require('./controllers/userController')

const bookController=require('./controllers/bookController')

//import jwt middleware
const jwtMiddleware=require('./middleware/jwtMiddleware')

// import multer 
const multerConfig=require('./middleware/imagemulterMiddleware')

//create the instance for the class routes
const route= new express.Router()

//path for register function 
route.post('/register',userController.registerController)

//path to Login
route.post('/login',userController.loginController)

//path too Google Login
route.post('/google-login',userController.googleLoginController)

//
route.post('/add-book',jwtMiddleware,multerConfig.array('uploadedImage',3),bookController.addBookController)


// export route 
module.exports=route