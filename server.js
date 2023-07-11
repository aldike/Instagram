const express = require('express');
const logger = require('morgan');
const passport = require('./app/auth/passport');
// const multer = require('multer');
// const upload = multer();
const app = express();
require('./app/auth/passport');

app.use(logger('dev'));
app.use(express.urlencoded());
app.use(express.json());
// app.use(upload.any());
app.use(passport.initialize());
app.use(require('./app/auth/routes'))


app.listen(8000, () =>{
    console.log("Server is listening on port 8000");
})