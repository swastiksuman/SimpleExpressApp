const express = require('express');
const mongoose = require('mongoose');

const app = express();
const db = mongoose.connect('mongodb://swastik:elnino@cluster0-shard-00-00-ufg82.mongodb.net:27017,cluster0-shard-00-01-ufg82.mongodb.net:27017,cluster0-shard-00-02-ufg82.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true }, 
  (err, db) => {console.log(err)}
);

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel.js');
const bookRouter = express.Router();
bookRouter.route('/books').get((req, res) => {
  const { query } = req;
  Book.find(query, (err, books) => {
    if(err){
      return res.send(err);
    }else{
      return res.json(books);
    }  
  }); 
}); 

bookRouter.route('/books/:bookId').get((req, res) => {
  const { query } = req;
  Book.findById(req.params.bookId, (err, books) => {
    if(err){
      return res.send(err);
    }else{
      return res.json(books);
    }  
  }); 
}); 

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Hello! World');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
