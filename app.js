var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
const prodMode = process.env.prodMode;

const dotenv = require('dotenv');
dotenv.config();

var commonRouter = require('./routes/common');

var app = express();
app.enable('trust proxy');
if(prodMode != undefined){
  app.use((req, res, next) => {
    req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
  })
}

app.use(logger('dev'));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/static', express.static(path.join(__dirname, 'public')));
//app.use(favicon(path.join(__dirname,'public','images','favicon.jpg')));
global.mode = 'prod';

app.use('/', commonRouter);

console.log('Server started!');

module.exports = app;
