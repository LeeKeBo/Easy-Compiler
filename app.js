/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-03-23 20:01:21
 * @LastEditTime: 2019-08-29 18:28:42
 * @LastEditors: Please set LastEditors
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var request = require('request')
var userDao = require('./dao/userDao')
var redisStore = require('./dao/redisFun')
var execCompiler = require('./util/run')
var loginFun = require('./util/login');
var getFile = require('./util/getFile')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

process.on('uncaughtException', function (err) {
    console.log('Caught exception: ', err);
});

var app = express();
app.use(bodyParser());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
})

app.post('/login', function (req, res) {
    loginFun.login(req, res);
})

app.post('/storeUserName', function (req, res) {
    loginFun.userinfoOp(req, res);
})

app.get('/getFileList', function (req, res) {
    getFile.getFileList(req, res);
})

app.get('/getFile', function (req, res) {
    getFile.getFile(req, res);
})



app.get('/isLogin', function (req, res) {
    var sessionId = req.headers['sessionid'];

    redisStore.isLogin(sessionId, function (loginStatu) {
        if (loginStatu == 1) {
            res.json({
                code: 1
            })
        } else {
            res.json({
                code: -1
            })
        }
    })
})

app.get('/getUseTime', function (req, res) {
    var sessionId = req.headers['sessionid'];

    redisStore.getOpenid(sessionId, function (openid) {
        userDao.getUseTime(openid, function (result) {
            res.json(result);
        })

    })
})

app.post('/compiler', function (req, res) {
    execCompiler.run(req, res);
})


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;