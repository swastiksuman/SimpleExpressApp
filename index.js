const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const winston = require('winston');
const consoleTransport = new winston.transports.Console()
const myWinstonOptions = {
    transports: [consoleTransport]
}
const logger = new winston.createLogger(myWinstonOptions)


if(process.env.ENV === 'Test'){
  const db = mongoose.connect('mongodb://swastik:elnino@cluster0-shard-00-00-ufg82.mongodb.net:27017,cluster0-shard-00-01-ufg82.mongodb.net:27017,cluster0-shard-00-02-ufg82.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true }, 
  (err, db) => {logger.error(err)}
);
}else{
  const db = mongoose.connect('mongodb://swastik:elnino@cluster0-shard-00-00-ufg82.mongodb.net:27017,cluster0-shard-00-01-ufg82.mongodb.net:27017,cluster0-shard-00-02-ufg82.mongodb.net:27017/prod?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority', { useNewUrlParser: true }, 
  (err, db) => {logger.error(err)}
);
}

const port = process.env.PORT || 3000;
const Book = require('./models/bookModel.js');
const bookRouter = require('./routes/bookRouter.js')(Book);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/api', bookRouter);

app.get('/', (req, res) => {
  res.send('Hello! World');
});

app.server = app.listen(port, () => {
  logger.info(`Listening on port ${port}`);
});

module.exports = app;