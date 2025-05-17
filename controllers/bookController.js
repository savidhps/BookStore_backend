
const books = require('../model/bookModel')

//to add books
exports.addBookController = async (req, res) => {
    console.log("inside add book controller");
    // console.log(req.body);
    // console.log(req.files);
    const { title, author, noofpages, imageurl, price, dprice, abstract, publisher, language, isbn, category, status, userMail, brought } = req.body
    console.log(title, author, noofpages, imageurl, price, dprice, abstract, publisher, language, isbn, category, status, userMail, brought);


    uploadedImage = []
    req.files.map((item) => { uploadedImage.push(item.filename) })
    console.log(uploadedImage);

    const email = req.payload
    console.log(email);



    try {
        const existingBook = await books.findOne({ title, userMail: email })

        if (existingBook) {
            res.status(401).json("you have already added the book")
        } else {
            const newBook = new books({
                title, author, noofpages, imageurl, price, dprice, abstract, publisher, language, isbn, category, uploadingImg: uploadedImage
                , userMail: email
            })
            await newBook.save()
            res.status(200).json(newBook)
        }

    } catch (error) {
        res.status(500).json(error)
    }


    // res.status(200).json('request recieved at addbookController')
}

//to get home books only four books
exports.getHomeBookController = async (req, res) => {

    try {
        const allHomeBooks = await books.find().sort({ _id: -1 }).limit(4)
        console.log(allHomeBooks);

        res.status(200).json(allHomeBooks)
    } catch (error) {
        res.status(500).json(error)
    }
}

//get all books
exports.getAllBookController = async (req, res) => {
    console.log(req.query)
    const searchKey=req.query.search

    try {

        const query={
            title:{
                $regex:searchKey,$options:"i"
            }
        }

        const allHomeBooks = await books.find(query)
        // console.log(allHomeBooks);

        res.status(200).json(allHomeBooks)
    } catch (error) {
        res.status(500).json(error)
    }
}

//to get a perticular book
exports.getABookController = async (req, res) => {
    const { id } = req.params
    // console.log(id);


    try {
        const eBook = await books.findOne({ _id: id })
        res.status(200).json(eBook)

    } catch (error) {
        res.status(500).json(error)
    }
}