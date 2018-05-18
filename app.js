var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var kafka = require('kafka-node');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var Consumer = kafka.Consumer;
const client = new kafka.KafkaClient({kafkaHost: 'ec2-18-204-96-185.compute-1.amazonaws.com:8089'});
var consumer = new Consumer(
    client,
    [
        { topic: 'lumenconcept.telemetry' }
    ]
);

io.on('connection', function (socket) {
  console.log("Cliente Conectado");
});

function callSockets(io, message){
    io.sockets.emit('iot', message);
}

consumer.on('message', function (message) {
    callSockets(io, message);
});

module.exports = {app: app, server: server};
