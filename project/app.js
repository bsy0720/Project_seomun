var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var path = require('path');

var routers = require('./routes/route');

var app = express();


// const express = require('express');
// var expressLayouts = require('express-ejs-layouts');
// const app = express();

// const homes = require('./routes/route.js'); 
// app.use('/', homes); //미들웨어 등록

app.set('views', path.join(__dirname,'views'));
// app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');
// app.set('layout', 'layout');
// app.set('layout extractScripts', true);

// app.engine('html', require('ejs').renderFile);



//css랑 img,js 의 파일 사용을 위한 경로 설정
// app.use(express.static(__dirname + '/public'));
// app.use(expressLayouts);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname,'public')));
app.use('/', routers);

module.exports = app;