
function booksController(Book) {
    function post(req, res) {
        if(!req.body.title){
            res.status(400);
            return res.send('Title is required')
        }
        const book = new Book(req.body);
        book.save();
        res.status(201);
        return res.json(book);
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