var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var AccountRouter = require('./routes/Account');
var DashboardRouter = require('./routes/Dashboard');

var app = express();
const mysql = require('mysql');
const { response } = require('express');

const con= mysql.createConnection({
  host: '3.143.232.77',
  user:'jasonoh22',
  password: '1234'
});

con.connect(function(err) {
  if (err) throw err;
  console.log('Connected');
  });
  
app.get('/', (req, res) => {  
  con.query('SHOW databases;', function(err, result) {
    if (err) throw err;
    res.send(result);
    });
})// view engine setup



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Account', AccountRouter);
app.use('/Dashboard', DashboardRouter);


app.listen(8000, () => {
    console.log(`Example app listening at http://localhost:8000`)
  })

module.exports = app;
