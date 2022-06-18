const path = require('path');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const apiRouter = require('./routes/api')

const app = express();
const PORT = 3000;


mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to Database...'));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// handle requests for static files
app.use(express.static(path.resolve(__dirname, '../client')));

// define route handler
app.use('/api', apiRouter);


// catch all for unknown routes
app.use((req, res) => res.status(404).send('Page not found'));

// express error handler


app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error', 
    status: 400, 
    message: { err: 'An error occurred' }, 
  };
  const errObj = Object.assign({}, defaultErr, err);
  console.log(errObj.log);
  return res.status(errObj.status).json(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;