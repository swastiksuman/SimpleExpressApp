const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const db = mongoose.connect('mongodb://swastik:elnino@cluster0-shard-00-00-ufg82.mongodb.net:27017,cluster0-shard-00-01-ufg82.mongodb.net:27017,cluster0-shard-00-02-ufg82.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true }, 
  (err, db) => {console.log(err)}
);

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel.js');
const bookRouter = require('./routes/bookRouter.js')(Book);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Hello! World');
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
