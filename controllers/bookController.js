
function booksController(Book) {
    function post(req, res) {
        const book = new Book(req.body);
        book.save();
        return res.status(201).json(book);
    }

    function get(req, res) {
        const { query } = req;
        Book.find(query, (err, books) => {
            if (err) {
                return res.send(err);
            } else {
                return res.json(books);
            }
        });
    }
    return {post, get};
}

module.exports = booksController;