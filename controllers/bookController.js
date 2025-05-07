
//to add books
exports.addBookController=async (req,res) => {
    console.log("inside add book controller");
    res.status(200).json('request recieved at addbookController')
}