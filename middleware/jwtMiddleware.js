
//import jwt
const jwt=require('jsonwebtoken')

const jwtMiddleware=(req,res,next)=>{
    console.log("inside jwt middlearew");
    const token=req.headers['authorization'].split(' ')[1]
    // console.log(token);

    try{
        const jwtResoponse = jwt.verify(token,'secretkey')//decoding the data 
        console.log(jwtResoponse);
        req.payload =jwtResoponse.userMail
        next()
    }catch(error){
        res.status(401).json('invalid request',error)
    }
}
module.exports = jwtMiddleware