const jobs = require("../model/jobmodel");

//add job controller
exports.addJobController=async(req,res)=>{
    const {title,location,jType,salary,qualification,experience,description}=req.body
    console.log(title,location,jType,salary,qualification,experience,description);
    try{
        const existingJob=await jobs.findOne({title,location})
        if (existingJob){
            res.status(404).json("job already added")
        }else{
            const newJob=new jobs({
                title,location,jType,salary,qualification,experience,description
            })
            await newJob.save()
            res.status(200).json(newJob)
        }
    }catch(error){
        res.status(500).json(error)
    }
}

// get all job controller
exports.getAllJobController=async(req,res)=>{
    const searchKey=req.query.search
    // console.log(searchKey);
    
    try{
        const alljobs=await jobs.find({title:{$regex:searchKey,$options:"i"}})
        res.status(200).json(alljobs)
    }catch(error){
        res.status(500).json(error)
    }
}

//DElete a job controller
exports.deleteAJobController=async(req,res)=>{
    const {id}=req.params
    try{
        await jobs.findByIdAndDelete({_id:id})
        res.status(200).json("Deleted sucessfully")
    }catch(error){
        res.status(500).json(error)
    }
}