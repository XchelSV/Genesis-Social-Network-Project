var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session    		= require('express-session');
var uuid = require('uuid');
var multipart = require('connect-multiparty');
var redis = require('redis');


var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;
var ObjectID = require('mongodb').ObjectID;
var mongoose = require('mongoose');
var client = redis.createClient();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(multipart());
app.use(cookieParser());
app.use(session({

				genid: function (req){ return uuid.v1()},
				secret: 'q~!!#s4HALA^MADRIDcds4<>>*S3--_-`´ç@',
				saveUninitialized: 	false,
				resave: 			false
			}));

app.use(express.static(path.join(__dirname, 'public')));


var connStr = 'mongodb://localhost:27017/GenesisDB';
mongoose.connect(connStr, function(err) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});

client.on('connect', function (){
    console.log('New Redis Client Connect since now');
});
//MongoClient.connect ("mongodb://localhost/GenesisDB",function (err,GenesisDB){
//if (err) throw err;



  require('./routes/routes_www')(app,ObjectID);
  require('./routes/routes_API')(app,ObjectID,uuid,client);
  require('./routes/routes_API_app')(app,ObjectID,uuid,client);
  require('./routes/routes_SocketIO')(io);
//});

http.listen(1234,function () {
   
   console.log ('1,2,3 ... 4, Concectado al puerto 1234');

});



