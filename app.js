var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var MongoClient = require('mongodb').MongoClient

//const uri = "mongodb+srv://esachin:@sachin@@cluster0-fqmpm.mongodb.net/test?retryWrites=true&w=majority";
const uri = "mongodb://localhost:27017/billingsolutions";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(function(err, db) {
    if (err) throw err

    const orders = client.db("billingsolutions").collection("orders");
    orders.find().toArray((err, res) => {
        if (err) throw err;
        console.log(res);
    })
    client.close();
})
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(express.static(path.join(__dirname, '/billingUI/dist')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);
app.get('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.sendFile(path.join(__dirname, '/billingUI/dist/billingUI/index.html'));
});
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

module.exports = app;