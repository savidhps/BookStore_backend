// import multer

const multer= require('multer')

const storage=multer.diskStorage({
    // path to store the file 
    destination:(req,file,callback)=>{
        callback(null,'/uploads')
    },
    //name to store the file
    filename:(req,file,callback)=>{
        const fname=`image-${file.orginalname}`
        callback(null,fname)
    }
})

const fileFilter=(req,file,callback)=>{
    //accept only png,jpg,jpeg
    if(file.mineType=='image/png' || file.mineType=='image/jpg'||file.mineType=='image/jpeg'){
        callback(null,true)
    }else{
        callback(null,false)
        callback(new Error("accept onlu png,jpg,jpeg"))
    }
}


//create configuration
const multerConfig=multer({
    storage,
    fileFilter
})

module.exports =multerConfig