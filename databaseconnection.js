// connecting to the mongodb database
const mongoose=require('mongoose')

const connectionString=process.env.DATABASE

mongoose.connect(connectionString).then(()=>{
    console.log('mongodb connected sucessfully');

    
}).catch((err)=>{
    console.log(`mongoos connection failed dut to this:${err}`);
    
})