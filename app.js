var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoryRouter = require('./routes/categories');
var uploadRouter = require('./routes/uploader');
var productRouter = require('./routes/products');

var bodyparser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(express.static(path.join(__dirname,'./public/images')));
app.use(express.static(path.join(__dirname, '/billingUI/dist')));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
bodyParser = {
    json: { limit: '50mb', extended: true },
    urlencoded: { limit: '50mb', extended: true }
};
//app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/products',productRouter);
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