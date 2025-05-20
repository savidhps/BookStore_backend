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