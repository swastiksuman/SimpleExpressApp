const express = require('express');
const bookController = require('../controllers/bookController.js');

const routes = (Book) => {
    const bookRouter = express.Router();
    const controller = bookController(Book);
    bookRouter.route('/books')
        .post(controller.post)
        .get(controller.get);

    bookRouter.route('/books/:bookId')
        .get((req, res) => {
            const { query } = req;
            Book.findById(req.params.bookId, (err, books) => {
                if (err) {
                    return res.send(err);
                } else {
                    return res.json(books);
                }
            });
        })
        .put((req, res) => {
            Book.findById(req.params.bookId, (err, book) => {
                if(err){
                    return res.send(err);
                }
                book.title = req.body.title;
                book.author = req.body.author;
                book.genre = req.body.genre;
                book.read = req.body.read;
                book.save();
                return res.json(book);
            })
        })
        .patch((req, res) => {
            const { book } = req;
            Object.entries(req.body).forEach((item) => {
                const key = item[0];
                const value = item[1];
                book[key] = value;
            });
            req.book.save((err) => {
                if(err){
                    return res.send(err);
                }
                return res.json(book);
            });
        })
        .delete((req, res) => {
            console.log(req.book);
            req.book.remove((err) => {
                if(err){
                    return res.send(err);
                }
                return res.sendStatus(204);
            });
        })
        ;
        return bookRouter;
}

module.exports = routes; 