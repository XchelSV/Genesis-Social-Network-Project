var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID

// view engine setup
app.set('views', './views');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(__dirname+ '/public'));


MongoClient.connect ("mongodb://localhost/GenesisDB",function (err,GenesisDB){
if (err) throw err;

  require('./routes/routes_www')(app,GenesisDB,ObjectID);
  require('./routes/routes_API')(app,GenesisDB,ObjectID);
  require('./routes/routes_SocketIO')(io);
});

http.listen(1234,function () {
   
   console.log ('1,2,3 ... 4, Concectado al puerto 1234');

});



