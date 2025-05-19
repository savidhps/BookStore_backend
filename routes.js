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

//path to get home (4) books
route.get('/all-home-book',bookController.getHomeBookController)



//_____________USER______________

//path to get all books
route.get('/all-books',jwtMiddleware,bookController.getAllBookController)

// path to add books
route.post('/add-book',jwtMiddleware,multerConfig.array('uploadedImage',3),bookController.addBookController)

//Path to get a book 
route.get('/view-books/:id',bookController.getABookController)


//----------------ADMIN_______________-----
//view book for admin
route.get('/admin-all-books',jwtMiddleware,bookController.getAllBookAdminController)

//path to approve a book
route.put('/approve-book',jwtMiddleware,bookController.approveBookControler)


// export route 
module.exports=route