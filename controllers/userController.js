//register

const users = require("../model/userModel");

exports.registerController=async(req,res)=>{
    //logic
    const {username,email,password}=req.body
    console.log(username,email,password);
    try {
        const existinUers=await users.findOne({email})
        if (existinUers) {
            res.status(400).json('Already exists')//sending the responce to frontend
        } else {
            const newUser=new users({
                username,
                email,
                password,
            })
            await newUser.save()//mongodb save -mongoose function
            res.status(200).json(newUser)
        }
    } catch (error) {
        res.status(500).json(error)
    }
    
}