const express = require("express");
const {check, validationResult} = require("express-validator");
const books = require("../books.json");
const save = require("../services/save.service");

const router = express.Router();


router.get("/books", (req, res) => {
    const books = require("../books.json");
    res.status(200).json({
        status: 'success',
        message: 'books records successfully fecthed',
        data: books
    });

});

router.post("/book", [
    check("name", "Book name is required").not().isEmpty(),
    check("author", "Book author is required").not().isEmpty()
],async(req, res) => {
    const {name, author} = req.body;
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            error: error.array()
        })
    }

    books.push({
        name,
        author,
        id: Math.random(),
    })

    const {status, errors} = save(books);
    if (status) {
        return res.status(200).json({
            status: "success",
            message: "Books successfully posted",
            data: books
        })
    }
    return res.status(500).json({
        status: "failed",
        message: "An error occured trying to save file",
        error: errors
    })
})

router.put("/:bookId", async(req, res) => {
    const {bookId} = req.params;
    const {name, author} = req.body;

    let bookIndex;
    const foundBook = books.find((book, index) =>  {
        book.id == bookId;
        if (book.id == bookId) {
            bookIndex = index;
            return book;
        }
    });
    if (foundBook == undefined) {
        return res.status(404).json({
            message: `Book with ID: ${bookId} isn't found`,
            status: 'failed'
        })
    }

    let updatedBooks = [];
    if (name) {
        foundBook.name = name;
        let updatedBook = null;
        updatedBooks = books.map(book => {
            if (book.id == bookId) {
                updatedBook = {
                    ...book,
                    name
                }
                return updatedBook
            }
            return book
        })
    }
    if (author) {
        foundBook.author = author;
        let updatedBook = null;
        updatedBooks = books.map(book => {
            if (book.id == bookId) {
                updatedBook = {
                    ...book,
                    author
                }
                return updatedBook
            }
            return book
        })
    }

    save(updatedBooks);
    return res.status(201).json({
        status: 'success',
        message: `Book with ID ${bookId} has successfully been updated`,
        newBooks: updatedBooks
    })
})

router.delete("/:bookId", async(req, res) => {
    const {bookId} = req.params;

    const foundBook = books.find(book => book.id == bookId);
    if (!foundBook) {
        return res.status(404).json({
            status: 'failed',
            message: `Books with the ID: ${bookId} is not found`
        })
    }
    const updatedBooks = books.filter(book => book.id != bookId);
    save(updatedBooks);
    return res.status(200).json({
        status: 'success',
        message: `Book with the ID: ${bookId} has successfully been deleted`
    })
  
})


module.exports = router