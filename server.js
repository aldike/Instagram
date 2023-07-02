const express = require('express');
const logger = require('morgan');
// const multer = require('multer');
// const upload = multer();
const app = express();

app.use(logger('dev'));
app.use(express.urlencoded());
app.use(express.json());
// app.use(upload.any());

app.use(require('./app/auth/routes'))


app.listen(8000, () =>{
    console.log("Server is listening on port 8000");
})