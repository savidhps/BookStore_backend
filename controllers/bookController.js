
const books = require('../model/bookModel')
const stripe = require('stripe')('sk_test_51RSy07GbLKwtiywWUwZvMFDivxdAdvP8fFAFuesAlrUS3noicGEnyLbp6G4hOiMD75DAv83z5dnIdGx7bYpFSyyT00sbpXLjCp')

//to add books
exports.addBookController = async (req, res) => {
    console.log("inside add book controller");
    // console.log(req.body);
    // console.log(req.files);
    const { title, author, noofpages, imageurl, price, dprice, abstract, publisher, language, isbn, category, status, userMail, brought } = req.body
    // console.log(title, author, noofpages, imageurl, price, dprice, abstract, publisher, language, isbn, category, status, userMail, brought);


    uploadedImage = []
    req.files.map((item) => { uploadedImage.push(item.filename) })
    // console.log(uploadedImage);

    const email = req.payload
    // console.log(email);



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
        // console.log(allHomeBooks);

        res.status(200).json(allHomeBooks)
    } catch (error) {
        res.status(500).json(error)
    }
}

//get all books
exports.getAllBookController = async (req, res) => {
    // console.log(req.query)
    const searchKey = req.query.search
    const email = req.payload

    try {
        // query is the code for giving it to mongodb
        // also we are filtering the 
        const query = {
            title: {
                $regex: searchKey, $options: "i"
            },
            userMail: {
                $ne: email
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

//to get all books added by--- user
exports.getAllUserBookController = async (req, res) => {
    const email = req.payload
    console.log(email);
    try {
        const alluserBook = await books.find({ userMail: email })
        res.status(200).json(alluserBook)
    } catch (error) {
        res.status(500).json(error)
    }
}
//to get all user brought book user--
exports.getAllUserBroughtBookController = async (req, res) => {
    const email = req.payload
    console.log(email);
    try {
        const alluserBroughtBook = await books.find({ brought: email })
        res.status(200).json(alluserBroughtBook)
    } catch (error) {
        res.status(500).json(error)
    }
}

//to delete a user book
exports.deleteAUserBookController = async (req, res) => {
    const { id } = req.params
    console.log(id);
    try {
        await books.findByIdAndDelete({ _id: id })
        res.status(200).json("deleteSucessfully")
    } catch (error) {
        res.status(500).json(error)
    }

}

//payment controller
exports.makepaymentController = async (req, res) => {
    const { bookDetails } = req.body
    const email = req.payload
    console.log("inside make payment controller");

    try {
        console.log("inside try make payment controller");

        const existingBook = await books.findByIdAndUpdate(
            { _id: bookDetails._id }, {
            title: bookDetails.title,
            author: bookDetails.author,
            noofpages: bookDetails.noofpages,
            imageurl: bookDetails.imageurl,
            price: bookDetails.price,
            dprice: bookDetails.dprice,
            abstract: bookDetails.abstract,
            publisher: bookDetails.publisher,
            language: bookDetails.language,
            isbn: bookDetails.isbn,
            category: bookDetails.category,
            uploadedImag: bookDetails.uploadedImag,
            status: 'sold',
            userMail: bookDetails.userMail,
            brought: email
        },
            { new: true })
        console.log("Done updation", existingBook);

        // const line_item = [{
        //     price_data: {
        //         currency: "usd",
        //         product_data: {
        //             name: bookDetails.title,
        //             description: `${bookDetails.author} |${bookDetails.publisher}`,
        //             images: [bookDetails.imageurl],
        //             metadata: {
        //                 title: bookDetails.title,
        //                 author: bookDetails.author,
        //                 noofpages: bookDetails.noofpages,
        //                 imageurl: bookDetails.imageurl,
        //                 price: `${bookDetails.price}`,
        //                 dprice: `${bookDetails.dprice}`,
        //                 abstract: bookDetails.abstract.slice(0, 20),
        //                 publisher: bookDetails.publisher,
        //                 language: bookDetails.language,
        //                 isbn: bookDetails.isbn,
        //                 category: bookDetails.category,
        //                 // uploadedImag: bookDetails.uploadedImag,
        //                 status: 'sold',
        //                 userMail: bookDetails.userMail,
        //                 brought: email
        //             },
        //             unit_amount: Math.round(bookDetails.dprice * 100)//amount must me in cent converting to dollor

        //         }
        //     },

        //     quantity: 1,
        // }]
        const line_item = [{
            price_data: {
                currency: "usd",
                product_data: {
                    name: bookDetails.title,
                    description: `${bookDetails.author} | ${bookDetails.publisher}`,
                    images: [bookDetails.imageurl],
                    metadata: {
                        title: bookDetails.title,
                        author: bookDetails.author,
                        noofpages: bookDetails.noofpages,
                        imageurl: bookDetails.imageurl,
                        price: `${bookDetails.price}`,
                        dprice: `${bookDetails.dprice}`,
                        abstract: bookDetails.abstract.slice(0, 20),
                        publisher: bookDetails.publisher,
                        language: bookDetails.language,
                        isbn: bookDetails.isbn,
                        category: bookDetails.category,
                        status: 'sold',
                        userMail: bookDetails.userMail,
                        brought: email
                    },

                },
                unit_amount: Math.round(bookDetails.dprice * 100)//represented by cents (1 cent = 0.01$)  
            },
            quantity: 1
        }];
        console.log(line_item);

        //create stripe checkout seassion
        const session = await stripe.checkout.sessions.create({
            //parchased using card
            payment_method_types: ["card"],
            //details of product that is puschasing
            line_items: line_item,
            // session is used for making payment
            mode: "payment",
            //if the payment is sucessfull the url to be shown
            success_url: 'http://localhost:5173/payment-sucess',
            //if payment is failed the url to be shown
            cancel_url: 'http://localhost:5173/payment-error'

        });
        console.log(session);
        res.status(200).json({ sessionId: session.id })

    } catch (error) {
        res.status(500).json(error)
    }
}

//------------Admin part______________-------------------------------

//to get all book admin
exports.getAllBookAdminController = async (req, res) => {
    try {
        const allExistingBooks = await books.find()
        res.status(200).json(allExistingBooks)
    } catch (error) {
        res.status(500).json(error)
    }
}

//to approve books
exports.approveBookControler = async (req, res) => {
    const { _id, title, author, noofpages, imageurl, price, dprice, abstract, publisher, language, isbn, category, uploadingImg, status, userMail, brought } = req.body
    // console.log("_id,title,author,noofpages,imageurl,price,dprice,abstract,publisher,language,isbn,category,uploadingImg,status,userMail,brought");

    try {
        const existingBook = await books.findByIdAndUpdate({ _id }, {
            _id, title, author, noofpages, imageurl, price, dprice, abstract, publisher, language, isbn, category, uploadingImg, status: "approved", userMail, brought
        }, { new: true })
        // await existingBook.save()
        res.status(200).json(existingBook)

    } catch (error) {
        res.status(500).json(error)
    }

}

